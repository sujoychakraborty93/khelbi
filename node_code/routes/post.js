const express = require("express");
const router = express.Router();
const sqlcode = require("../DAO/sqlcode_page");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
var AWS = require("aws-sdk");
require("dotenv/config");

const dbfile_path = process.env.DBFILE_PATH;
const sqliteInstance = new sqlcode(dbfile_path);

const successMsg = "Database operation successful";

// async function addNewMatchDetails(res, postData) {
//   try {
//     let addRslt = await sqliteInstance.addNewMatch(postData);
//     res.send(addRslt);
//   } catch (err) {
//     console.log("addNewMatchDetails error" + err);
//   }
// }

router.post("/newmatch", async (req, res) => {
  //   console.log("req.body");
  // console.log(req.body);
  // res.send({});
  try {
    let addRslt = await sqliteInstance.addNewMatch(req.body);
    if (addRslt !== successMsg) {
      res.status(400);
    }
    res.send(addRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("addNewMatchDetails error" + err);
    res.send("addNewMatchDetails error" + err);
  }
});

router.post("/newteam", async (req, res) => {
  try {
    let addRslt = await sqliteInstance.addNewTeam(req.body);
    if (addRslt !== successMsg) {
      res.status(400);
    }
    res.send(addRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("addNewTeamDetails error" + err);
    res.send("addNewTeamDetails error" + err);
  }
});

router.post("/newplayer", async (req, res) => {
  try {
    let addRslt = await sqliteInstance.addNewPlayer(req.body);
    if (addRslt !== successMsg) {
      res.status(400);
    }
    res.send(addRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("addNewPlayerDetails error" + err);
    res.send("addNewPlayerDetails error" + err);
  }
});

router.post("/newumpire", async (req, res) => {
  try {
    let addRslt = await sqliteInstance.addNewUmpire(req.body);
    if (addRslt !== successMsg) {
      res.status(400);
    }
    res.send(addRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("addNewUmpireDetails error" + err);
    res.send("addNewUmpireDetails error" + err);
  }
});

router.post("/newvenue", async (req, res) => {
  try {
    let addRslt = await sqliteInstance.addNewVenue(req.body);
    if (addRslt !== successMsg) {
      res.status(400);
    }
    res.send(addRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("addNewVenueDetails error" + err);
    res.send("addNewVenueDetails error" + err);
  }
});

router.post("/registration", async (req, res) => {
  try {
    let addRslt = await sqliteInstance.addNewPlayer(req.body);
    if (addRslt !== successMsg) {
      res.status(400);
    }
    res.send(addRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("addNewPlayerDetails error" + err);
    res.send("addNewPlayerDetails error" + err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const email_id = req.body.nameEmail;
    const password = req.body.namePassword;
    const result = await sqliteInstance.getLoginUsingQuery({
      email_id: email_id
    });
    let token = "";
    res.setHeader("count", result.length);
    if (result.length === 0) {
      res.status(404);
      token = "";
    } else {
      if (password !== result[0].password) {
        res.status(401);
        token = "";
      } else {
        const user = { email_id: email_id, password: password };
        res.status(200);
        token = jwt.sign(user, process.env.SECRET_KEY);
      }
    }

    res.cookie("token", token, {
      httpOnly: true,
      path: "/",
      // secure: true,
      maxAge: 3600000
    });
    // res.send(token);
    res.end();
  } catch (err) {
    res.status(400);
    console.log("user login error" + err);
    res.send("user login error" + err);
  }
});

// router.post("/logout", async (req, res) => {
//   try {
//     res.cookie("token", "", {
//       httpOnly: true,
//       path: "/",
//       // secure: true,
//       // expires: new Date(1),
//       maxAge: 3600000
//       // expires: Date.now()
//     });
//     req.session.destroy();
//     res.status(200);
//     // res.json({ message: "logout successful" });
//     res.end();
//   } catch (err) {
//     res.status(400);
//     console.log("user login error" + err);
//     res.send("user logout error" + err);
//   }
// });

router.post("/newrequest", async (req, res) => {
  try {
    let addRslt = await sqliteInstance.addNewRequest(req.body);
    if (addRslt !== successMsg) {
      res.status(400);
    }
    res.send(addRslt);
  } catch (err) {
    console.log("add New Request error" + err);
    res.send("add New Request error" + err);
  }
});

router.post("/newcomment", async (req, res) => {
  try {
    let addRslt = await sqliteInstance.addNewComment(req.body);
    if (addRslt !== successMsg) {
      res.status(400);
    }
    res.send(addRslt);
  } catch (err) {
    console.log("add New Comment error" + err);
    res.send("add New Comment error" + err);
  }
});

// =======================================   IMAGE UPLOAD     =======================================
//
//-------------------------------   METHOD 1 (UPLOAD INTO DATABSE)  --------------------------------
//
// router.post("/newimagetodb", async (req, res) => {
//   try {
//     let addRslt = await sqliteInstance.addImageToDb(req.body);
//     if (addRslt !== successMsg) {
//       res.status(400);
//     }
//     res.send(addRslt);
//   } catch (err) {
//     console.log("add New Comment error" + err);
//     res.send("add New Comment error" + err);
//   }
// });
//-------------------------------   METHOD 2 (USING MULER - SAVE LOCALLY)  --------------------------
//
// Create a multer instance and set the destination folder.
// var dest = "E:\\React\\umpire_schedule\\cricExtra\\db_code\\user_images";
// var dest = process.env.Image_Destination;
// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, dest);
//   },
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       path
//         .basename(file.originalname)
//         .split(path.extname(file.originalname))[0] +
//         "-" +
//         Date.now() +
//         path.extname(file.originalname)
//     );
//   }
// });
// // Create an upload instance and receive a single file
// var upload = multer({ storage: storage }).single("file");

// // Setup thePOSTroute to upload a file
// router.post("/newimages3", async (req, res) => {
//   // console.log(req.body);
//   // console.log(req.params);
//   upload(req, res, async function(err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     // console.log(req.body.user_id);
//     // console.log(req.file.path);

//     // add image data to database
//     let addToDatabaseData = {
//       user_id: req.body.user_id,
//       image_data:
//         path
//           .basename(req.file.originalname)
//           .split(path.extname(req.file.originalname))[0] +
//         "-" +
//         Date.now() +
//         path.extname(req.file.originalname),
//       created: req.body.created,
//       last_modified: req.body.last_modified
//     };
//     let addRslt = await sqliteInstance.addImageData(addToDatabaseData);
//     if (addRslt !== successMsg) {
//       res.status(400);
//     }
//     // res.send(addRslt);
//     return res.status(200).send(req.file);
//     // return res.status(200).send(req.file.path);
//   });
// });
//
//-------------------------------   METHOD 3 (USING MULER - AWS)  --------------------------
//

var storage = multer.memoryStorage();
// Create an upload instance and receive a single file
var upload = multer({ storage: storage }).single("file");

// Setup thePOSTroute to upload a file
router.post("/newimages3", upload, async (req, res) => {
  const file = req.file;

  // file will be stored with name having (user_id & timestamp) unique combo
  // const fileNewName =
  //   path.basename(file.originalname).split(path.extname(file.originalname))[0] +
  //   "-" +
  //   Date.now() +
  //   path.extname(file.originalname);
  const fileNewName =
    req.body.user_id + "-" + Date.now() + path.extname(file.originalname);

  // s3 bucket configuration
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  //Where you want to store your file
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    // Key: file.originalname,
    Key: process.env.AWS_BUCKET_IMAGE_FOLDER + fileNewName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  // add file to aws s3
  s3bucket.upload(params, async function(err, result) {
    if (err) {
      console.log("error while uploading in s3");
      return res.status(500).json({ error: true, Message: err });
    } else {
      console.log("uploaded in S3");
      console.log(result.Location);

      // add image data to database
      let addToDatabaseData = {
        user_id: req.body.user_id,
        image_data: result.Location,
        created: req.body.created,
        last_modified: req.body.last_modified
      };
      let addRslt = await sqliteInstance.addImageDataS3(addToDatabaseData);
      if (addRslt !== successMsg) {
        res.status(400).json({
          error: true,
          Message: "error while uploading image data into database"
        });
      } else {
        return res.status(200).send(result);
      }
    }
  });
});

//----------------------------   METHOD 4 (USING MULER - MEMORY AND AWS S3)  ------------------------
//
// Multer ships with storage engines DiskStorage and MemoryStorage
// And Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
// var storage = multer.memoryStorage();
// var upload = multer({ storage: storage });

// route to upload a pdf document file
// In upload.single("file") - the name inside the single-quote is the name of the field that is
// going to be uploaded.
// router.post("/newimages3", upload.single("file"), function(req, res) {
//   const file = req.file;
//   const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

//   let s3bucket = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
//   });

//   //Where you want to store your file

//   var params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: file.originalname,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//     ACL: "public-read"
//   };

//   s3bucket.upload(params, function(err, data) {
//     if (err) {
//       res.status(500).json({ error: true, Message: err });
//     } else {
//       res.send({ data });
//       var newFileUploaded = {
//         description: req.body.description,
//         fileLink: s3FileURL + file.originalname,
//         s3_key: params.Key
//       };
//       var document = new DOCUMENT(newFileUploaded);
//       document.save(function(error, newFile) {
//         if (error) {
//           throw error;
//         }
//       });
//     }
//   });
// });

//----------------------------   METHOD 5 (USING MULER - ANOTHER WAY)  ------------------------
//
// https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef
//

//------------------------------   UPDATE IMAGE OF EXISTING USER  -------------------------------
//

// var storage = multer.memoryStorage();
// // Create an upload instance and receive a single file
// var upload = multer({ storage: storage }).single("file");

// Setup thePOSTroute to upload a file
router.post("/imageupdates3", upload, async (req, res) => {
  const file = req.file;

  // file will be stored with name having (user_id & timestamp) unique combo
  // const fileNewName =
  //   path.basename(file.originalname).split(path.extname(file.originalname))[0] +
  //   "-" +
  //   Date.now() +
  //   path.extname(file.originalname);
  const fileNewName =
    req.body.user_id + "-" + Date.now() + path.extname(file.originalname);

  // s3 bucket configuration
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  //Where you want to store the uploaded file
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    // Key: file.originalname,
    Key: process.env.AWS_BUCKET_IMAGE_FOLDER + fileNewName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  // parameter for copying the files to "deletedimages" folder to be deleted later. this is called
  // when user wants to change is current image to a new image. the old image is moved to this folder
  var copyParamKey = req.body.old_image_data.split(
    process.env.AWS_IMAGES_BASE_URL
  )[1];
  // e.g. old_image_data = "https://cricextra.s3.amazonaws.com/images/1-1575319356321.jpg"
  // e.g. AWS_IMAGES_BASE_URL = "https://cricextra.s3.amazonaws.com/"
  // e.g. so copyParamKey will be "images/1-1575319356321.jpg"
  var oldFileName = copyParamKey.split(process.env.AWS_BUCKET_IMAGE_FOLDER)[1];
  console.log("copyParamKey");
  console.log(copyParamKey);
  console.log(oldFileName);
  var copyParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    CopySource: process.env.AWS_BUCKET_NAME + "/" + copyParamKey,
    Key: process.env.AWS_BUCKET_IMAGE_DELETED_FOLDER + oldFileName, // file name kept same as the old file so that we can keep a record
    ACL: "public-read"
  };

  // parameter to delete old file
  var deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: copyParamKey
  };

  // add file to aws s3
  s3bucket.upload(params, async function(err, result) {
    if (err) {
      console.log("error while uploading in s3");
      return res.status(500).json({ error: true, Message: err });
    } else {
      console.log("from put.js - uploaded in S3");
      // console.log(result.Location);

      // add image data to database
      let updateToDatabaseData = {
        user_id: req.body.user_id,
        image_data: result.Location,
        created: req.body.created,
        last_modified: req.body.last_modified,
        id: req.body.id
      };
      let addRslt = await sqliteInstance.updateImageS3(updateToDatabaseData);
      if (addRslt !== successMsg) {
        res.status(400).json({
          error: true,
          Message: "error while uploading image data into database"
        });
      }
      // else {
      //   return res.status(200).send(result);
      // }
      // copy the old file to another folder 'deletedimage'
      s3bucket.copyObject(copyParams, (err, copyData) => {
        if (err) {
          console.log("error while copying file");
          console.log(err);
          res.status(500).json({ error: true, Message: err });
        } else {
          console.log("from put.js - file copied into deleted folder");
          s3bucket.deleteObject(deleteParams, (err, deleteData) => {
            if (err) {
              console.log("error while deleting file");
              console.log(err);
              res.status(500).json({ error: true, Message: err });
            } else {
              console.log("from put.js - file deleted from images folder");
              return res.status(200).send(result);
            }
          });
        }
      });
    }
  });
});
// =======================================        =======================================

module.exports = router;
