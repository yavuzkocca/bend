const MyInfo = require('../../models/MyInfo')

const asyncWrapper = require('express-async-handler')
const CustomError = require("../../helpers/error/CustomError")

const unblock = asyncWrapper(async(req,res,next)=>{
    const id = req.body.blocked_profile_id

    const user = await MyInfo.findOneAndUpdate(
        {"profile.wallet_address":req.user.address},
        
          {$pull:{blocked_profile_ids:id}}
        ,
        {
          new: true,
          runValidators: true
        }
        
      )
      
    return res.status(200).json({
        success:true,
        data:user
    })
    
})

module.exports = unblock