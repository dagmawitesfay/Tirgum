const express = require("express");
const { ensureAuth } = require("../middleware/auth");
const authController = require("../controllers/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("landingpage");
});
router.get("/upload-page", ensureAuth, (req,res)=>{
  res.render("uploadLetter.ejs")
})
router.use("/", require("./letter"));

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
