const fs = require("fs");
const path = require("path");

function upload(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ Error: "Please upload your image" });
  } else {
    const fileExt = path.extname(req.file.originalname); 
    const acceptableExtensions = [".png", ".jpg", ".jpeg", ".gif"];

    if (!acceptableExtensions.includes(fileExt)) {
      return res.status(400).json({ Error: "Image Only" });
    }
    const filePath = fs.readFileSync(req.file.path);
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const directory = path.join(__dirname, "..", "uploads", fileName);

    fs.writeFileSync(directory, filePath, { encoding: "utf-8" });
    fs.unlinkSync(req.file.path);

    req.fileURL = directory;

    next();
  }
}

module.exports = { upload };
