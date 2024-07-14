const MyInfo = require("../../models/MyInfo")
const asyncWrapper = require('express-async-handler')

const fetchLikes = asyncWrapper(async (req, res, next) => {
    const nftId = req.params.nftId

    const res1 = await MyInfo.find(
        {likes_nft:nftId},
    )

    const res2 = res1.map((liker) =>{
        const likerr = {
            profile_id:liker.profile._id,
            verified:liker.profile.verified,
            wallet_address:liker.profile.wallet_address,
            name:liker.profile.name,
            img_url:liker.profile.img_url,
            username:liker.profile.username
        }
        return likerr
    })

    res.status(200).json({
        success: true,
        data: res2
      })
    
})

module.exports=fetchLikes