const MyInfo = require('../../models/MyInfo')
const Comments = require('../../models/Comments')
const asyncWrapper = require('express-async-handler')
const CustomError = require('../../helpers/error/CustomError')
const Notification = require('../../models/Notifications')


const deleteComment = asyncWrapper(async (req, res, next) => {

  const commentId = req.params.commentId

  const deletedComment = await Comments.findOneAndDelete(
    { _id: commentId }
  )
  const deleteNotification = await Notification.findOneAndDelete(
    { "comment_id": commentId }
  )
  console.log(`Notisilindi:${commentId}`)
  const user = await MyInfo.findOneAndUpdate({
    'profile.wallet_address': req.user.address
  },
    { $pull: { comments: deletedComment._id } }
  )




  res.status(200).json({

    data: commentId
  })
})

module.exports = deleteComment
