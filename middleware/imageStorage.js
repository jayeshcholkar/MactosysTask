const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: async (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  }),
});

module.exports = upload;
