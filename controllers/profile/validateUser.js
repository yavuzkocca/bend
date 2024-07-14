const MyInfo = require('../../models/MyInfo')

const asyncWrapper = require('express-async-handler')
const CustomError = require("../../helpers/error/CustomError")

const validateUser = asyncWrapper(async(req,res,next)=>{
    const {username} = req.params

    const user = await MyInfo.findOne({profile:{username}})

    if(user){
        return next(new CustomError("User Exists",400))
    }
    return res.status(200).json({
        success:true
    })

})

module.exports =validateUser
