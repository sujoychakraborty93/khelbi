const express = require("express");
const router = express.Router();
const sqlcode = require("../DAO/sqlcode_page");

const dbfile_path = process.env.DBFILE_PATH;
let sqliteInstance = new sqlcode(dbfile_path);

// async function addNewMatchDetails(res, postData) {
//   try {
//     let addRslt = await sqliteInstance.addNewMatch(postData);
//     res.send(addRslt);
//   } catch (err) {
//     console.log("addNewMatchDetails error" + err);
//   }
// }

router.delete("/match", async (req, res) => {
  try {
    console.log(req.body);
    let delRslt = await sqliteInstance.deleteMatch(req.body);
    res.send(res.statusCode + " " + delRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("delete Match error" + err);
    res.send("delete Match error" + err);
  }
});

router.delete("/team", async (req, res) => {
  try {
    let delRslt = await sqliteInstance.deleteTeam(req.body);
    res.send(delRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("delete Team error" + err);
    res.send("delete Team error" + err);
  }
});

router.delete("/player", async (req, res) => {
  try {
    let delRslt = await sqliteInstance.deletePlayer(req.body);
    res.send(delRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("delete Player error" + err);
    res.send("delete Player error" + err);
  }
});

router.delete("/umpire", async (req, res) => {
  try {
    let delRslt = await sqliteInstance.deleteUmpire(req.body);
    res.send(delRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("delete Umpire error" + err);
    res.send("delete Umpire error" + err);
  }
});

router.delete("/venue", async (req, res) => {
  try {
    let delRslt = await sqliteInstance.deleteVenue(req.body);
    res.send(delRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("delete Venue error" + err);
    res.send("delete Venue error" + err);
  }
});

router.delete("/request", async (req, res) => {
  try {
    let delRslt = await sqliteInstance.deleteRequest(req.body);
    res.send(delRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("delete Request error" + err);
    res.send("delete Request error" + err);
  }
});
router.delete("/comment", async (req, res) => {
  try {
    let delRslt = await sqliteInstance.deleteComment(req.body);
    res.send(delRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("delete Comment error" + err);
    res.send("delete Comment error" + err);
  }
});
router.delete("/image", async (req, res) => {
  try {
    let delRslt = await sqliteInstance.deleteImage(req.body);
    res.send(delRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("delete Image error" + err);
    res.send("delete Image error" + err);
  }
});
router.delete("/images3", async (req, res) => {
  try {
    let delRslt = await sqliteInstance.deleteImageS3(req.body);
    res.send(delRslt);
    // res.statusCode == 200
    //   ? res.send("Match added successfully")
    //   : res.send("Error while adding new match. Status Code " + res.statusCode);
  } catch (err) {
    console.log("delete Image error" + err);
    res.send("delete Image error" + err);
  }
});

module.exports = router;
