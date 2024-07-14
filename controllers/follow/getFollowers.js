const MyInfo = require('../../models/MyInfo')

const asyncWrapper = require('express-async-handler')
const CustomError = require("../../helpers/error/CustomError")

const followers = asyncWrapper(async(req,res,next)=>{
    const want = req.query.want;
    const limit = req.query.limit;
    const profile_id = req.query.profile_id;
    console.log(`Want:${want}`)
    console.log(`Limit:${limit}`)
    console.log(`ProfId:${profile_id}`)
  
    if (want !== 'followers') {
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

    const followss = user.followers
      
    const data2 = async () => {
      const data = []
      for(const id of followss){
        const ress = await MyInfo.findOne({
          "profile._id":id
        })
        data.push(ress)
        console.log(`GetFolloersResponse:${ress}`)
      }
      return data
    }

    return res.json({
      data: await data2()
    })
})

module.exports = followers


// const {_id} = req.params

//     const user = await MyInfo.findOne(
//         {"profile._id":_id},
//       )
//       console.log(user)
//     return res.status(200).json({
//         success:true,
//         data:user
//     })