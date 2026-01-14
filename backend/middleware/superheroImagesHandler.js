const multer = require("multer");
const sharp = require("sharp");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image. Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadSuperheroImages = upload.array("images");

exports.resizeSuperheroImages = catchAsync(async (req, res, next) => {
  let existingImages = req.body.existingImages || [];
  if (typeof existingImages === "string") {
    existingImages = [existingImages];
  }

  req.body.images = [...existingImages];

  if (req.files && req.files.length > 0) {
    await Promise.all(
      req.files.map(async (file, i) => {
        const filename = `hero-${Date.now()}-${i + 1}.jpeg`;

        await sharp(file.buffer)
          .resize(1920, 1080)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/img/heroes/${filename}`);

        req.body.images.push(filename);
      })
    );
  }

  delete req.body.existingImages;

  next();
});
