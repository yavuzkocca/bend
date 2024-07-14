const MyInfo = require('../../models/MyInfo')
const Comments = require('../../models/Comments')
const asyncWrapper = require('express-async-handler')
const CustomError = require('../../helpers/error/CustomError')
var moment = require('moment');
const Notification = require('../../models/Notifications')

const likeComment = asyncWrapper(async (req, res, next) => {
  var epoch = moment().unix();
  const commentId = req.params.commentId

  const user = await MyInfo.findOne({
    'profile.wallet_address': req.user.address
  })
  console.log(`USERWALLET ${user.profile.wallet_address}`)
  const likedComment = await Comments.findOne(
    { _id: commentId }
  )

  console.log(`LikedComment ${likedComment}`)
  const found = likedComment.likers.some(obj => obj.hasOwnProperty("wallet_address") && obj["wallet_address"] === req.user.address);

  if (!found) {
    await Comments.updateOne(
      { _id: commentId },
      {
        $inc: { like_count: 1 },
        $push: {
          likers: {
            profile_id: user.profile._id,
            verified: user.profile.verified,
            wallet_address: user.profile.wallet_address,
            name: user.profile.name,
            img_url: user.profile.img_url,
            timestamp: epoch,
            username: user.profile.username,
            comment_id: commentId
          }
        }
      })
  }
  await MyInfo.findOneAndUpdate({
    'profile.wallet_address': req.user.address
  },
    { $push: { likes_comment: commentId } }
  )

  if (user.profile.wallet_address !== likedComment.address) {
    await Notification.create({
      img_url: user.profile.img_url,
      type_name: "LIKE_ON_COMMENT",
      to_timestamp: epoch,
      comment_id: commentId,
      actor: {
        img_url: user.profile.img_url,
        name: user.profile.name,
        profile_id: user.profile._id,
        username: user.profile.username,
        wallet_address: user.profile.wallet_address
      },
      notification_owner: likedComment.address//commentin yada NFTnin sahibi
    })


  }

  const updatedUser = await MyInfo.findOne({ 'profile.wallet_address': req.user.address })




  res.status(200).json({

    data: updatedUser
  })
})

module.exports = likeComment
