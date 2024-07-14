const multer = require('multer');
const path = require('path');
const CustomError = require('../../helpers/error/CustomError');

// Storage, FileFilter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, '/public/uploads/privImages'));
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    req.savedProfileImage =
      'privimage_' + req.user.address + Date.now() + '.' + extension;
    console.log('Yüklenen dosya adı:', req.savedProfileImage); // Dosya adını konsola yazdırma
    cb(null, req.savedProfileImage);
  },
});

const fileFilter = (req, file, cb) => {
  let allowedMimemTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'video/webm',
    'video/mp4'
  ];
  if (!allowedMimemTypes.includes(file.mimetype)) {
    return cb(new CustomError('Please Provide valid Image or Video', 400), false);
  }
  return cb(null, true);
};

const privImageUpload = multer({ storage, fileFilter });

module.exports = privImageUpload;
