const MyInfo = require('../../models/MyInfo')

const asyncWrapper = require('express-async-handler')
const CustomError = require("../../helpers/error/CustomError")

const followings = asyncWrapper(async(req,res,next)=>{
    const want = req.query.want;
    const limit = req.query.limit;
    const profile_id = req.query.profile_id;
    console.log(`want:${want}`)
    console.log(`limit:${limit}`)
    console.log(`profile_id:${profile_id}`)
  
    if (want !== 'following') {
      return res.status(400).json({ error: 'Invalid want parameter' });
    }
  
    if (!limit || isNaN(limit) || limit > 500) {
      return res.status(400).json({ error: 'Invalid limit parameter' });
    }
  
    // Burada, veritabanından profil takipçilerinin verilerini çekin ve cevaba ekleyin
    // ...
    const user = await MyInfo.findOne(
        {"profile._id":profile_id},
      )

    const followss = user.followings
      
    const data2 = async () => {
      const data = []
      for(const id of followss){
        const ress = await MyInfo.findOne({
          "profile._id":id
        })
        data.push(ress)
        console.log(`GetFollowingsResponse:${ress}`)
      }
      return data
    }

    return res.json({
      data: await data2()
    })
})

module.exports = followings