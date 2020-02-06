const express = require("express");
const router = express.Router();
const sqlcode = require("../DAO/sqlcode_page");
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

router.put("/match", async (req, res) => {
  //   console.log("req.body");
  //   console.log(req.body);
  // res.send({});
  try {
    let updateRslt = await sqliteInstance.updateMatch(req.body);
    if (updateRslt !== successMsg) {
      res.status(400);
    }
    res.send(updateRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match");
  } catch (err) {
    console.log("error in updateMatchDetails: " + err);
    res.send("error in updateMatchDetails: " + err);
  }
});

router.put("/team", async (req, res) => {
  try {
    let updateRslt = await sqliteInstance.updateTeam(req.body);
    if (updateRslt !== successMsg) {
      res.status(400);
    }
    res.send(updateRslt);
  } catch (err) {
    // console.log("error in updateTeamDetails: " + err);
    res.status(400).send("error while updateTeamDetails: " + err);
    // res.send("error in updateTeamDetails: " + err);
  }
});

router.put("/player", async (req, res) => {
  try {
    let updateRslt = await sqliteInstance.updatePlayer(req.body);
    if (updateRslt !== successMsg) {
      res.status(400);
    }
    res.send(updateRslt);
  } catch (err) {
    // console.log("error in updateTeamDetails: " + err);
    res.status(400).send("error while updatePlayerDetails: " + err);
    // res.send("error in updateTeamDetails: " + err);
  }
});

router.put("/umpire", async (req, res) => {
  try {
    let updateRslt = await sqliteInstance.updateUmpire(req.body);
    if (updateRslt !== successMsg) {
      res.status(400);
    }
    res.send(updateRslt);
  } catch (err) {
    // console.log("error in updateTeamDetails: " + err);
    res.status(400).send("error while updateUmpireDetails: " + err);
    // res.send("error in updateTeamDetails: " + err);
  }
});

router.put("/venue", async (req, res) => {
  try {
    let updateRslt = await sqliteInstance.updateVenue(req.body);
    if (updateRslt !== successMsg) {
      res.status(400);
    }
    res.send(updateRslt);
  } catch (err) {
    // console.log("error in updateTeamDetails: " + err);
    res.status(400).send("error while updateVenueDetails: " + err);
    // res.send("error in updateTeamDetails: " + err);
  }
});

router.put("/request", async (req, res) => {
  try {
    let updateRslt = await sqliteInstance.updateRequest(req.body);
    if (updateRslt !== successMsg) {
      res.status(400);
    }
    res.send(updateRslt);
  } catch (err) {
    // console.log("error in updateTeamDetails: " + err);
    res.status(400).send("error while updating a Request: " + err);
    // res.send("error in updateTeamDetails: " + err);
  }
});
router.put("/close/request", async (req, res) => {
  try {
    let updateRslt = await sqliteInstance.updateRequest(req.body);
    if (updateRslt !== successMsg) {
      res.status(400);
    }
    res.send(updateRslt);
  } catch (err) {
    // console.log("error in updateTeamDetails: " + err);
    res.status(400).send("error while closing a Request: " + err);
    // res.send("error in updateTeamDetails: " + err);
  }
});
router.put("/comment", async (req, res) => {
  try {
    let updateRslt = await sqliteInstance.updateComment(req.body);
    if (updateRslt !== successMsg) {
      res.status(400);
    }
    res.send(updateRslt);
  } catch (err) {
    // console.log("error in updateTeamDetails: " + err);
    res.status(400).send("error while updating a Comment: " + err);
    // res.send("error in updateTeamDetails: " + err);
  }
});
router.put("/image", async (req, res) => {
  try {
    let updateRslt = await sqliteInstance.updateImage(req.body);
    if (updateRslt !== successMsg) {
      res.status(400);
    }
    res.send(updateRslt);
  } catch (err) {
    // console.log("error in updateTeamDetails: " + err);
    res.status(400).send("error while updating image: " + err);
    // res.send("error in updateTeamDetails: " + err);
  }
});
// =======================================   IMAGE UPLOAD     =======================================
//

module.exports = router;
