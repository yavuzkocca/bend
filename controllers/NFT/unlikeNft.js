const MyInfo = require('../../models/MyInfo')

const asyncWrapper = require('express-async-handler')
const CustomError = require("../../helpers/error/CustomError")
const NftCollection = require('../../models/NftCollection')
const Notification = require('../../models/Notifications')

const unlikeNft = asyncWrapper(async (req, res, next) => {
    const nftId = req.params.nftId
    await MyInfo.findOneAndUpdate(
        { "profile.wallet_address": req.user.address },
        { $pull: { likes_nft: nftId } }
    )

    await NftCollection.findOneAndUpdate(
        { nft_id: nftId },
        { $inc: { like_count: -1 } }
    )
    console.log("Silme işlemi öncesinde koşullar:", { type_name: "LIKE_ON_CREATED_NFT", nft: { nft_id: nftId }, actor: { wallet_address: req.user.address } });

    const notif = await Notification.findOneAndDelete({
        type_name: "LIKE_ON_CREATED_NFT",
        "nft.nft_id": nftId,
        "actor.wallet_address": req.user.address
    })

    console.log(notif)
    const updatedUser = await MyInfo.findOne({ 'profile.wallet_address': req.user.address })




    res.status(200).json({

        data: updatedUser
    })

})

module.exports = unlikeNft