var createError = require("http-errors");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { format } = require("date-fns");

// 1st party dependencies
var indexRouter = require("./routes/index");

async function getApp() {
  // Database
  const mongoUri = https://msdocs-expressjs-mongodb-13-server.mongo.cosmos.azure.com:443/;
  
  try {
    await mongoose.connect(mongoUri, {
      poolSize: 20,  // Increase pool size if under heavy load
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      socketTimeoutMS: 60000,  // Increase socket timeout to 60 seconds
      connectTimeoutMS: 60000,  // Increase connection timeout to 60 seconds
      serverSelectionTimeoutMS: 60000  // Increase server selection timeout to 60 seconds
    });
    console.log('Connected to database');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }


  var app = express();

  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.locals.format = format;

  app.use("/", indexRouter);
  app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js")); // redirect bootstrap JS
  app.use(
    "/css",
    express.static(__dirname + "/node_modules/bootstrap/dist/css")
  ); // redirect CSS bootstrap

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
  });

  return app;
}

/**
 * Normalize a port into a number, string, or false.
 */

 function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
module.exports = {
  getApp
};
