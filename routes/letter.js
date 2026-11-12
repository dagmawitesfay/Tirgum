const express = require("express");
const letterController = require("../controllers/letter");
// const { ensureAuth, ensureGuest } = require("../middleware/auth");
const detailController = require("../controllers/letterDetail")
const router = express.Router();

router.get("/", (req, res) => res.redirect("/dashboard"));
router.get("/dashboard", letterController.dashboard);
router.get("/letters/:id" , detailController.getLetterDetail)

module.exports = router;