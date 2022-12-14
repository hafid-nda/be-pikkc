const userService = require("../../../services/userService");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../../models");
const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(isPasswordCorrect);
    });
  });
}

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia", {
    expiresIn: "30d", // expired after 1day
  });
}

module.exports = {
  async register(req, res) {
    const { username, email } = req.body;
    const password = await encryptPassword(req.body.password);
    userService
      .create({ username, email, password })
      .then((user) => {
        res.status(201).json({
          status: true,
          message: `Create User Success`,
          data: {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          }
        });
      })
      .catch((e) => console.log(e));
  },

  async login(req, res) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await userService.get({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Email tidak ditemukan" });
      return;
    }

    const isPasswordCorrect = await checkPassword(user.password, password);

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Password salah!" });
      return;
    }

    const token = createToken({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    req.headers.authorization = "Bearer " + token;
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    const role = user.role
    role2 = role.charAt(0).toUpperCase() + role.slice(1);
    res.status(200).json({
      status: true,
      message: `Berhasil Login Sebagai ${role2} `,
      data: {
        id: user.id,
        email: user.email,
        token,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    });
  },

  async whoAmI(req, res) {
    res.status(200).json({
      status: true,
      message: `Get Current User By Token Success`,
      data: req.user
    }
    );
  },

  async authorize(req, res, next) {
    console.log("req.headers :");
    console.log(req.headers);
    try {
      const bearerToken = req.headers['authorization'];
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Random");
      console.log("token payload :");
      console.log(tokenPayload);
      req.user = await User.findByPk(tokenPayload.id);
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },

  async isAdminOrSuperAdmin(req, res, next) {
    if (!(req.user.role === "admin" || req.user.role === "superadmin")) {
      res.json({
        message: "Anda bukan admin atau superadmin",
      });
      return;
    }
    next();
  },

  async isSuperAdmin(req, res, next) {
    if (!(req.user.role === "superadmin")) {
      res.json({
        message: "Anda bukan superadmin tidak dapat merubah member ke admin atau menghapus member",
      });
      return;
    }
    next();
  },


  list(req, res) {
    userService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: true,
          message: "Success Get All Users",
          data: { users: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req, res) {
    userService
      .create(req.body)
      .then((user) => {
        res.status(201).json({
          status: "OK",
          data: user,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {
    userService
      .update(req.params.id, req.body)
      .then((user) => {
        console.log(user);
        res.status(200).json({
          status: true,
          message: "Berhasil mengubah member ke admin",
          data: req.body
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    userService
      .get(req.params.id)
      .then((user) => {
        res.status(200).json({
          status: "OK",
          data: user,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  destroy(req, res) {
    userService
      .delete(req.params.id)
      .then(() => {
        res.status(200).json({
          status: true,
          message: "User Destroy From Database",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
