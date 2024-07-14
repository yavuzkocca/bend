const asyncWrapper = require('express-async-handler')
const MyInfo = require("../../models/MyInfo")

const trending = asyncWrapper(async (req, res, next) => {
    // const response = await MyInfo.find({followers:{$size :{$gt:0}}}).sort({followers:-1}).limit(5)

    const response = await MyInfo.find({ followers: { $exists: true, $ne: [] } })
        .sort({ followers: -1 })
        .limit(5);



    const users = response.map(user => ({
        profile_id: user.profile._id,
        name: user.profile.name,
        username: user.profile.username,
        address: user.profile.wallet_address,
        img_url: user.profile.img_url,
        love_count: user.followers.length,
        verified: user.profile.verified,
    }))




    res.json({ data: users })






})

module.exports = trending