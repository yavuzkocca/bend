const multer = require('multer')
const path = require('path')
const CustomError = require('../../helpers/error/CustomError')
const { now } = require('mongoose')

// Storage, FileFilter

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename)
    cb(null, path.join(rootDir, '/public/uploads/profilecover'))
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    req.savedProfileCoverImage =
      'coverimage_' + req.user.address+ Date.now()+ '.' + extension
    cb(null, req.savedProfileCoverImage)
    console.log(`REQsavedCoverImage=${req.savedProfileCoverImage}`)
    console.log(`FILE=${JSON.stringify(file)}`)
  }
})

const fileFilter = (req, file, cb) => {
  let allowedMimemTypes = ['image/jpg', 'image/jpeg', 'image/png']
  if (!allowedMimemTypes.includes(file.mimetype)) {
    return cb(
      new CustomError('Please Provide valid Image', 400),
      false
    )
  }
  return cb(null, true)
}

const coverImageUpload = multer({ storage, fileFilter })

module.exports = coverImageUpload