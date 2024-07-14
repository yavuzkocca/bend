const MyInfo = require('../../models/MyInfo')
const Notification = require('../../models/Notifications')
var moment = require('moment');
const asyncWrapper = require('express-async-handler')
const CustomError = require("../../helpers/error/CustomError")

const follow = asyncWrapper(async (req, res, next) => {
  const { _id } = req.params
  var epoch = moment().unix();
  const user = await MyInfo.findOneAndUpdate(
    { "profile.wallet_address": req.user.address },

    { $push: { followings: _id }, $inc: { following_count: 1 } }
    ,
    {
      new: true,
      runValidators: true
    }
  )


  const user2 = await MyInfo.findOneAndUpdate(
    { "profile._id": _id },
    //{$push:{followers:user.profile._id},$inc:{followers_count:1}}
    { $push: { followers: user.profile._id.toString() }, $inc: { followers_count: 1 } }
    ,
    {
      new: true,
      runValidators: true
    }

  )

  await Notification.create({
    img_url: user.profile.img_url,
    type_name: "FOLLOW",
    to_timestamp: epoch,
    actor: {
      img_url: user.profile.img_url,
      name: user.profile.name,
      profile_id: user.profile._id,
      username: user.profile.username,
      wallet_address: user.profile.wallet_address
    },
    notification_owner: user2.profile.wallet_address
  })



  return res.status(200).json({
    success: true,
    data: user
  })

})

module.exports = follow