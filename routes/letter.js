const express = require("express");
const letterController = require("../controllers/letter");
 const { ensureAuth, ensureGuest } = require("../middleware/auth");
const detailController = require("../controllers/letterDetail")
const upload = require("../middleware/multer")
const router = express.Router();

router.get("/dashboard", ensureAuth, letterController.dashboard);
router.get("/letters/new", ensureAuth, (req, res) => res.render("uploadLetter"));
router.get("/letters/:id" , ensureAuth, detailController.getLetterDetail)


const handleUpload = (req, res, next) => {
  upload.single("document")(req, res, (err) => {
    if (err) {
      const error = err.code === "LIMIT_FILE_SIZE" ? "too-large" : "unsupported-file";
      return res.status(400).render("uploadLetter", { error });
    }
    next();
  });
};
router.post("/document-upload", ensureAuth, handleUpload, letterController.uploadLetter);

module.exports = router;