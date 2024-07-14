const MyInfo = require('../../models/MyInfo')
var moment = require('moment');
const asyncWrapper = require('express-async-handler')
const CustomError = require("../../helpers/error/CustomError")
const NftCollection = require('../../models/NftCollection')
const Notification = require("../../models/Notifications")

const likeNft = asyncWrapper(async (req, res, next) => {
    var epoch = moment().unix();
    const nftId = req.params.nftId
    const userr = await MyInfo.findOne(
        { "profile.wallet_address": req.user.address }
    )

    const nftCollectionFind = await NftCollection.findOne(
        { nft_id: nftId }
    )



    const updatedUser = await MyInfo.findOneAndUpdate(
        { "profile.wallet_address": req.user.address },
        { $push: { likes_nft: nftId } }
    )

    const nftCollection = await NftCollection.findOneAndUpdate(
        { nft_id: nftId },
        { $inc: { like_count: 1 } }
    )


    if (req.user.address == nftCollectionFind.creator_address) {
        return res.status(200).json({

            data: updatedUser
        })
    } else {
        await Notification.create({
            img_url: userr.profile.img_url,
            type_name: "LIKE_ON_CREATED_NFT",
            to_timestamp: epoch,
            actor: {
                img_url: userr.profile.img_url,
                name: userr.profile.name,
                profile_id: userr.profile._id,
                username: userr.profile.username,
                wallet_address: userr.profile.wallet_address
            },
            nft: {
                nft_id: nftId,
                img_url: nftCollection.token_img_url,
                name: nftCollection.token_name,
                username: nftCollection.creator_username,
                wallet_address: nftCollection.creator_address
            },

            notification_owner: nftCollection.creator_address//commentin yada NFTnin sahibi
        })
    }





    res.status(200).json({

        data: updatedUser
    })

})

module.exports = likeNft