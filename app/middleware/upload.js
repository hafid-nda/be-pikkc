const multer = require("multer");
const util = require("util");
const path = require("path");

const maxSize = 15 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./") + "/assets");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/msword" ||
      file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true); 
    } else {
      cb(null, false);
      return cb(new Error("file_extension"));
    }
  },
}).single("file");  

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;