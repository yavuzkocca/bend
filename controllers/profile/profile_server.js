const asyncWrapper = require('express-async-handler')
const MyInfo = require('../../models/MyInfo')


// const profile_server = asyncWrapper(
//     async (req, res, next) =>{
//     const username = req.params.username
//     console.log(username)

//     const profile = await Profile.findOne({username:username})
      
//     const myinfo = await MyInfo.findOne({
//     profile: profile._id
//     }) 
//     next()
//     return res.status(200).json({
//         success:true,
//         data:{myinfo,profile}
//     })
// })

const profile_serverWallet = asyncWrapper(
    async (req, res, next) =>{
    const wallet_address = req.params?.username
    console.log(`walletaddress:${wallet_address}`)
    console.log(`walletaddress:${JSON.stringify(req.params)}`)
   

    const myinfo = await MyInfo.findOne({"profile.username":wallet_address})
      
    // const myinfo = await MyInfo.findOne({
    // profile: profile._
    // }) 
    next()
    return res.status(200).json({
        success:true,
        data:myinfo
    })
})
    




module.exports={profile_serverWallet}