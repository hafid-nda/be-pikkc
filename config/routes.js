const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();

// login as superadmin, admin, or member
apiRouter.post(
  "/api/v1/login",
  controllers.api.v1.userController.login
);

// whoami
apiRouter.get(
  "/api/v1/whoami",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isAdminOrSuperAdmin,
  controllers.api.v1.userController.whoAmI
);


//destroy users from db
apiRouter.delete(
  "/api/v1/logout/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isSuperAdmin,
  controllers.api.v1.userController.destroy
);

// add admin by superadmin only
apiRouter.put(
  "/api/v1/users/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isSuperAdmin,
  controllers.api.v1.userController.update
);

// register as member
apiRouter.post(
  "/api/v1/register",
  controllers.api.v1.userController.register
);

/* ====== DIRECTORY ROUTES ======  */
apiRouter.get(
  "/api/v1/directories",
  controllers.api.v1.directoryController.list
);

//create directory
apiRouter.post(
  "/api/v1/directory",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isAdminOrSuperAdmin,
  controllers.api.v1.directoryController.create
  // upload.single('assets')
);

// read one directory 
apiRouter.get(
  "/api/v1/directories/:id",
  controllers.api.v1.directoryController.show
);

// update directory by admin or superadmin
apiRouter.put(
  "/api/v1/directories/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isAdminOrSuperAdmin,
  controllers.api.v1.directoryController.update
);

// delete directory by admin or superadmin
apiRouter.delete(
  "/api/v1/directories/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isAdminOrSuperAdmin,
  controllers.api.v1.directoryController.makeDirectoryDeleted
);

// destroy directory by superadmin
apiRouter.delete(
  "/api/v1/dirdestroy/:id",
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.isSuperAdmin,
  controllers.api.v1.directoryController.makeDirectoryDestroy
);

apiRouter.get("/api/v1/errors", () => {
  throw new Error("The Industrial Revolution and its consequences have been a disaster for the human race.");
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
