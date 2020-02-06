const fs = require("fs");
const file = "./public/logfile.txt";

function logger(req, res, next) {
  let ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  let log = `\n${req.protocol}://${req.get("host")}${
    req.originalUrl
  } , Method = ${req.method} , Date = ${Date()} , IP = ${ip} , Status = ${
    res.statusCode
  }`;

  fs.appendFile(file, log, err => {
    if (err) throw err;
    console.log("Lyric saved!");
  });
  //   console.log(
  //     `${req.protocol}://${req.get("host")}${
  //       req.originalUrl
  //     }: ${Date()} : IP = ${ip}`
  //   );
  next();
}
module.exports = logger;
