const express = require("express");
const router = express.Router();
const sqlcode = require("../DAO/sqlcode_page");
const jwt = require("jsonwebtoken");
var AWS = require("aws-sdk");
require("dotenv/config");

// let dbfile_path =
// "E:\\React\\umpire_schedule\\cricExtra\\db_code\\sqlite3_db\\cricextra_db";
const dbfile_path = process.env.DBFILE_PATH;
let sqliteInstance = new sqlcode(dbfile_path);

async function getHomePageData(res, uid) {
  // let dbfile_path =
  //   "E:\\React\\umpire_schedule\\cricExtra\\db_code\\sqlite3_db\\cricextra_db";
  // let a = new sqlClass(dbfile_path);
  let result = await sqliteInstance.getUserHomePage(uid);
  res.setHeader("count", result.length);
  res.send(result);
}

// const checkToken = (req, res, next) => {
//   const header = req.headers["authorization"];

//   if (typeof header !== "undefined") {
//     const bearer = header.split(" ");
//     const token = bearer[1];

//     req.token = token;
//     next();
//   } else {
//     //If header is undefined return Forbidden (403)
//     res.sendStatus(403);
//   }
// };

router.get("/", (req, res) => {
  // land on homepage
  //res.send("Hello World!!!");
  //res.status(200).json({ message: 'Connected!' });
  //console.log(req.body);
  getHomePageData(res, 3);
});
router.get("/home", (req, res) => {
  getHomePageData(res, 3);
});
// =================================================================== //
// ================   MATCHES   ====================================== //
router.get("/get/myteammatches", (req, res) => {
  // getHomePageData(res, 3);
  const token = req.cookies.token;
  console.log(token);

  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      console.log("in error: ", err);
      res.status(403);
      res.send("You do not have permission to view the page");
    } else {
      res.status(200);
      req.query = { email_id: data.email_id };
      let result = await sqliteInstance.getMatchUsingQuery(req.query);
      res.setHeader("count", result.length);
      res.send(result);
    }
  });
});
router.get("/get/match/:id", async (req, res) => {
  let result = await sqliteInstance.getMatchUsingId(req.params.id);
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/match", async (req, res) => {
  const token = req.cookies.token;
  // jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
  const jwtReturn = await jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (err, data) => {
      if (err) {
        return "403";
      } else {
        return data;
      }
    }
  );
  if (jwtReturn === "403") {
    res.status(403);
    res.send("You do not have permission to view the page");
  } else {
    res.status(200);
    let result = await sqliteInstance.getMatchUsingQuery(req.query);
    res.setHeader("count", result.length);
    res.send(result);
  }
  // if (Object.keys(req.query).length !== 0) {
  //   let result = await sqliteInstance.getMatchUsingQuery(req.query);
  //   res.setHeader("count", result.length);
  //   res.send(result);
  // } else {
  //   let result = await sqliteInstance.getAllMatches();
  //   res.setHeader("count", result.length);
  //   res.send(result);
  // }
});
router.get("/get/allmatches", async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      res.status(403);
      res.send("You do not have permission to view the page");
    } else {
      res.status(200);
      // req.query = { email_id: data.email_id };
      let result = await sqliteInstance.getAllMatches();
      res.setHeader("count", result.length);
      res.send(result);
    }
  });
  // let result = await sqliteInstance.getAllMatches();
  // res.setHeader("count", result.length);
  // res.send(result);
});
// ================================================================= //
// ================   TEAMS   ====================================== //
router.get("/get/team/:id", async (req, res) => {
  let result = await sqliteInstance.getTeamUsingId(req.params.id);
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/team", async (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    let result = await sqliteInstance.getTeamUsingQuery(req.query);
    res.setHeader("count", result.length);
    res.send(result);
  } else {
    let result = await sqliteInstance.getTeamList();
    res.setHeader("count", result.length);
    res.send(result);
  }
});
router.get("/get/teamlist", async (req, res) => {
  let result = await sqliteInstance.getTeamList();
  res.setHeader("count", result.length);
  res.send(result);
});

// ============================================================================= //
// ============================   USERS/PLAYERS   ============================== //
router.get("/get/player/:id", async (req, res) => {
  let result = await sqliteInstance.getPlayerUsingId(req.params.id);
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/player", async (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    let result = await sqliteInstance.getPlayerUsingQuery(req.query);
    res.setHeader("count", result.length);
    res.send(result);
  } else {
    let result = await sqliteInstance.getPlayerList();
    res.setHeader("count", result.length);
    res.send(result);
  }
});
router.get("/get/playerlist", async (req, res) => {
  let result = await sqliteInstance.getPlayerList();
  res.setHeader("count", result.length);
  res.send(result);
});

// ============================================================================= //
// ================================   USER LOGIN   ================================ //
router.get("/get/userloginlist", async (req, res) => {
  let result = await sqliteInstance.getUserLoginList();
  res.setHeader("count", result.length);
  res.send(result);
});

router.get("/get/userlogin", async (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    const result = await sqliteInstance.getLoginUsingQuery(req.query);
    res.setHeader("count", result.length);
    res.send(result);
    // let token = "";
    // res.setHeader("count", result.length);
    // if (result.length === 0) {
    //   res.status(401);
    //   token = "Not a valid username/password combination";
    // } else {
    //   const user = { email_id: result[0].email_id };
    //   token = jwt.sign(user, process.env.SECRET_KEY);
    // }
    // res.send(token);
  } else {
    const result = await sqliteInstance.getUserLoginList();
    res.setHeader("count", result.length);
    res.send(result);
  }
});

// router.get("/authenticate", checkToken, (req, res) => {
router.get("/get/authenticate", (req, res) => {
  console.log("authenticate route called");
  jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("Could not connect to the protected route");
      res.status(200);
      res.json({ data: "" });
    } else {
      //If token is successfully verified, we can send the autorized data
      console.log("User connected");
      console.log(data);
      res.status(200);
      res.send(data); // data is {email_id: email_id, password: password}
    }
  });
});

router.get("/get/logout", (req, res) => {
  // req.cookies.destroy;
  // res.cookie("token", "");
  res.clearCookie("token");
  res.status(200);
  res.end();
  // res.json({ data: "" });
});

//Check to make sure header is not undefined, if so, return Forbidden (403)

// ============================================================================= //
// ================================   USER ROLE   ================================ //
router.get("/get/userrolelist", async (req, res) => {
  let result = await sqliteInstance.getUserRoleList();
  res.setHeader("count", result.length);
  res.send(result);
});

router.get("/get/userrole", async (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    let result = await sqliteInstance.getUserRoleUsingQuery(req.query);
    res.setHeader("count", result.length);
    res.send(result);
  } else {
    let result = await sqliteInstance.getUserRoleList();
    res.setHeader("count", result.length);
    res.send(result);
  }
});

// ============================================================================= //
// ================================   SECRET QUESTION   ================================ //
router.get("/get/secretquestionlist", async (req, res) => {
  let result = await sqliteInstance.getSecretQList();
  res.setHeader("count", result.length);
  res.send(result);
});

// ============================================================================= //
// ================================   UMPIRES   ================================ //
router.get("/get/umpire/:id", async (req, res) => {
  let result = await sqliteInstance.getUmpireUsingId(req.params.id);
  res.setHeader("count", result.length);
  res.send(result);
});

router.get("/get/umpire", async (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    let result = await sqliteInstance.getUmpireUsingQuery(req.query);
    res.setHeader("count", result.length);
    res.send(result);
  } else {
    let result = await sqliteInstance.getUmpireList();
    res.setHeader("count", result.length);
    res.send(result);
  }
});

router.get("/get/umpirelist", async (req, res) => {
  let result = await sqliteInstance.getUmpireList();
  res.setHeader("count", result.length);
  res.send(result);
});

// ============================================================================= //
// ================================   VENUE   ================================== //
router.get("/get/venue/:id", async (req, res) => {
  let result = await sqliteInstance.getVenueUsingId(req.params.id);
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/venue", async (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    let result = await sqliteInstance.getVenueUsingQuery(req.query);
    res.setHeader("count", result.length);
    res.send(result);
  } else {
    let result = await sqliteInstance.getVenueList();
    res.setHeader("count", result.length);
    res.send(result);
  }
});

router.get("/get/venuelist", async (req, res) => {
  let result = await sqliteInstance.getVenueList();
  res.setHeader("count", result.length);
  res.send(result);
});

// ===================================================================================== //
// ================================   COUNTRY_STATE   ================================== //
router.get("/get/countrystatelist", async (req, res) => {
  let result = await sqliteInstance.getCSList();
  res.setHeader("count", result.length);
  res.send(result);
});
// ============================================================================= //
// ================================   COUNTRY   ================================== //
router.get("/get/countrylist", async (req, res) => {
  let result = await sqliteInstance.getCountryList();
  res.setHeader("count", result.length);
  res.send(result);
});

// ============================================================================= //
// ============================   REQUEST   ============================== //
router.get("/get/request/:id", async (req, res) => {
  let result = await sqliteInstance.getRequestById(req.params.id);
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/request", async (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    let result = await sqliteInstance.getRequestUsingQuery(req.query);
    res.setHeader("count", result.length);
    res.send(result);
  } else {
    let result = await sqliteInstance.getRequestList();
    res.setHeader("count", result.length);
    res.send(result);
  }
});
router.get("/get/requestlist", async (req, res) => {
  let result = await sqliteInstance.getRequestList();
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/requesttemplatelist", async (req, res) => {
  let result = await sqliteInstance.getRequestTemplateList();
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/sporttypelist", async (req, res) => {
  let result = await sqliteInstance.getSportTypeList();
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/requeststatuslist", async (req, res) => {
  let result = await sqliteInstance.getRequestStatusList();
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/requestcomment", async (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    let result = await sqliteInstance.getRequestCommentByQuery(req.query);
    res.setHeader("count", result.length);
    res.send(result);
  } else {
    let result = await sqliteInstance.getRequestCommentList();
    res.setHeader("count", result.length);
    res.send(result);
  }
});
router.get("/get/requestcommentlist", async (req, res) => {
  let result = await sqliteInstance.getRequestCommentList();
  res.setHeader("count", result.length);
  res.send(result);
});
// ============================================================================= //
// ============================   IMAGE   ============================== //
router.get("/get/imagelist", async (req, res) => {
  let result = await sqliteInstance.getImageList();
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/imagelists3", async (req, res) => {
  let result = await sqliteInstance.getImageListS3();
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/image/:userid", async (req, res) => {
  let result = await sqliteInstance.getImageByUserId(req.params.userid);
  res.setHeader("count", result.length);
  res.send(result);
});
router.get("/get/images3/:userid", async (req, res) => {
  let result = await sqliteInstance.getImageByUserIdS3(req.params.userid);
  res.setHeader("count", result.length);
  res.send(result);
});
// get image from database where its stored as base64 data
router.get("/get/image", async (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    let result = await sqliteInstance.getImageUsingQuery(req.query);
    res.setHeader("count", result.length);
    res.send(result);
  } else {
    let result = await sqliteInstance.getImageList();
    res.setHeader("count", result.length);
    res.send(result);
  }
});
// get aws s3 image link from database
// router.get("/get/images3", async (req, res) => {
//   if (Object.keys(req.query).length !== 0) {
//     let result = await sqliteInstance.getImageUsingQueryS3(req.query);
//     res.setHeader("count", result.length);
//     res.send(result);
//   } else {
//     let result = await sqliteInstance.getImageListS3();
//     res.setHeader("count", result.length);
//     res.send(result);
//   }
// });
router.get("/get/images3", async (req, res) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  if (Object.keys(req.query).length !== 0) {
    const result = await sqliteInstance.getImageUsingQueryS3(req.query);
    console.log("result");
    console.log(result);
    if (result.length > 0) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        // we have result[0].image_data = https://cricextra.s3.amazonaws.com/images/61-1575354187200.jpg
        // but we need images/61-1575354187200.jpg. So split the data
        Key: result[0].image_data.split(process.env.AWS_IMAGES_BASE_URL)[1],
        Expires: parseInt(process.env.AWS_URL_EXPIRY)
      };
      const preSignedUrl = s3.getSignedUrl("getObject", params);
      console.log("preSignedUrl");
      console.log(preSignedUrl);
      res.setHeader("count", result.length);
      result[0].image_data = preSignedUrl;
      res.send(result);
    } else {
      res.send(result);
    }
  } else {
    let result = await sqliteInstance.getImageListS3();
    let params = {};
    let preSignedUrlArr = [];
    params.Bucket = process.env.AWS_BUCKET_NAME;
    params.Expires = parseInt(process.env.AWS_URL_EXPIRY);
    result.map(item => {
      params.Key = item.image_data.split(process.env.AWS_IMAGES_BASE_URL)[1];
      var preSignedUrl = s3.getSignedUrl("getObject", params);
      item.image_data = preSignedUrl;
      preSignedUrlArr.push(item);
    });

    console.log("preSignedUrlArr");
    console.log(preSignedUrlArr);
    res.setHeader("count", result.length);
    res.send(preSignedUrlArr);
  }
});

module.exports = router;
