const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");
const multer = require('multer');
const path = require("path");

const app = express();

/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/file",express.static(path.join(path.resolve("./"), 'assets')));
// app.use(bodyParser.json());

/** Install Router */
app.use(router);

module.exports = app;
