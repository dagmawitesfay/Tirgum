const express = require("express");
const letterController = require("../controllers/letter");

const router = express.Router();

router.get("/", (req, res) => res.redirect("/dashboard"));
router.get("/dashboard", letterController.dashboard);

module.exports = router;