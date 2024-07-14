const MyInfo = require('../../models/MyInfo')
const Comments = require('../../models/Comments')
const asyncWrapper = require('express-async-handler')
const CustomError = require('../../helpers/error/CustomError')
var moment = require('moment');
const Notification = require('../../models/Notifications')
const NftCollection = require("../../models/NftCollection")

const newComment = asyncWrapper(async (req, res, next) => {
  var epoch = moment().unix();
  const nftId = req.params.nftId
  const { message, parent_id } = req.body
  console.log(JSON.stringify(req.body))

  const user = await MyInfo.findOne({
    'profile.wallet_address': req.user.address
  })
  console.log(`REQUEST USER ADDRESS:${req.user.address}`)
  const comment = await Comments.create({
    added: epoch,
    text: message,
    commenter_profile_id: user.profile._id,
    nft_id: nftId,
    name: user.profile.name,
    img_url: user.profile.img_url,
    address: user.profile.wallet_address,
    username: user.profile.username,
    verified: user.profile.verified,
    parent_id: parent_id
  })

  await MyInfo.findOneAndUpdate({
    'profile.wallet_address': req.user.address
  },
    { $push: { comments: comment._id } }
  )

  const nftCollection = await NftCollection.findOne({
    "nft_id": nftId
  })

  if (parent_id == null) {
    if (user.profile.wallet_address !== nftCollection.creator_address) {
      await Notification.create({
        img_url: user.profile.img_url,
        type_name: "COMMENT_ON_CREATED_NFT",
        to_timestamp: epoch,
        comment_id: comment._id,
        actor: {
          img_url: user.profile.img_url,
          name: user.profile.name,
          profile_id: user.profile._id,
          username: user.profile.username,
          wallet_address: user.profile.wallet_address
        },
        notification_owner: nftCollection.creator_address//commentin yada NFTnin sahibi
      })
    }
  }
  else {
    const parentComment = await Comments.findOne({
      "parent_id": parent_id
    })
    if (parentComment.address !== user.profile.wallet_address) {
      await Notification.create({
        img_url: user.profile.img_url,
        type_name: "COMMENT_MENTION",
        to_timestamp: epoch,
        comment_id: comment._id,
        actor: {
          img_url: user.profile.img_url,
          name: user.profile.name,
          profile_id: user.profile._id,
          username: user.profile.username,
          wallet_address: user.profile.wallet_address
        },
        notification_owner: parentComment.address //commentin yada NFTnin sahibi
      })
    }
  }

  const updatedUser = await MyInfo.findOne({ 'profile.wallet_address': req.user.address })



  console.log("XXX" + comment)
  console.log(updatedUser)
  res.status(200).json({

    data: { comment, updatedUser }

  })


})

module.exports = newComment
