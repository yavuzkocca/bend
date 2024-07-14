const MyInfo = require('../../models/MyInfo')

const asyncWrapper = require('express-async-handler')
const CustomError = require("../../helpers/error/CustomError")
const Notification = require('../../models/Notifications')


const unfollow = asyncWrapper(async (req, res, next) => {
  const { _id } = req.params

  const user = await MyInfo.findOneAndUpdate(
    { "profile.wallet_address": req.user.address },

    { $pull: { followings: _id }, $inc: { following_count: -1 } }
    ,
    {
      new: true,
      runValidators: true
    }

  )
  const user2 = await MyInfo.findOneAndUpdate(
    { "profile._id": _id },

    { $pull: { followers: user.profile._id }, $inc: { followers_count: -1 } }
    ,
    {
      new: true,
      runValidators: true
    }

  )

  const deleteNotification = await Notification.findOneAndDelete(
    { "actor.wallet_address": user.wallet_address }
  )

  return res.status(200).json({
    success: true,
    data: user
  })

})

module.exports = unfollow