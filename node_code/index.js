const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const getroutes = require("./routes/get");
const postroutes = require("./routes/post");
const putroutes = require("./routes/put");
const deleteroutes = require("./routes/delete");
const logger = require("./public/logger");
const multer = require("multer");
var AWS = require("aws-sdk");
require("dotenv/config");

// Multer ships with storage engines DiskStorage and MemoryStorage
// And Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

//app.use(express.static('static_files')); //
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_SERVER); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }

  // Website you wish to allow to connect
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.setHeader("Access-Control-Allow-Origin", "*"
  // );
  // Request methods you wish to allow
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  // );
  // Request headers you wish to allow headers
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With,content-type"
  // );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// app.use(express.static(path.join(__dirname, 'www')));
// app.use(express.static("static_files"));
app.use(bodyParser.json({ limit: "50mb", extended: true })); // for json data in body
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // for form data in body
app.use(bodyParser.text());
app.use(cookieParser());

app.use(logger);

app.use("/api/", getroutes);
app.use("/api/post", postroutes);
app.use("/api/put", putroutes);
app.use("/api/delete", deleteroutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
