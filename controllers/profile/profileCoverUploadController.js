const asyncWrapper = require('express-async-handler')
const MyInfo = require('../../models/MyInfo')


const profileCoverUploadController = asyncWrapper(
  async (req, res, next) => {
    const user = await MyInfo.findOneAndUpdate(
      {"profile.wallet_address":req.user.address},
      
        {"profile.cover_url": req.savedProfileCoverImage,
      },
      {
        new: true,
        runValidators: true
      }
    )
    console.log("asjlgjasl")
    console.log(req.savedProfileCoverImage)
    next()
    res.status(200).json({
      success: true,
      message: 'Image Upload Successful',
      data: user
    })
    console.log(`ProfilecoveruploadUser:${user}`)
  }
)

module.exports = profileCoverUploadController
