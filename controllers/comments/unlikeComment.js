const MyInfo = require('../../models/MyInfo')
const Comments = require('../../models/Comments')
const asyncWrapper = require('express-async-handler')
const CustomError = require('../../helpers/error/CustomError')
const Notification = require('../../models/Notifications')


const unlikeComment = asyncWrapper(async (req, res, next) => {

  const commentId = req.params.commentId

  const user = await MyInfo.findOne({
    'profile.wallet_address': req.user.address
  })

  const unlikedCommentFind = await Comments.findOne(
    { _id: commentId }
  )

  const found = unlikedCommentFind.likers.some(obj => obj.hasOwnProperty("wallet_address") && obj["wallet_address"] === req.user.address);

  if (found) {
    const unlikedComment = await Comments.findOneAndUpdate(
      { _id: commentId },

      {
        $inc: { like_count: -1 },
        $pull: { likers: { profile_id: user.profile._id } }
      })
    await Notification.findOneAndDelete(
      { "comment_id": commentId }
    )
    await MyInfo.findOneAndUpdate({
      'profile.wallet_address': req.user.address
    },
      { $pull: { likes_comment: commentId } }
    )

  }

  const updatedUser = await MyInfo.findOne({ 'profile.wallet_address': req.user.address })




  res.status(200).json({

    data: updatedUser
  })




  //   res.status(200).json({

  //     data: comment
  //   })
})

module.exports = unlikeComment
