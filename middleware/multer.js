const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.memoryStorage(), // file as buffer in RAM
  limits: {fileSize:10 * 1024* 1024 } , // limit large files 
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase(); // lowercase so .JPG and .PDF also pass.
    // extension check
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext!==".pdf") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
