const MyInfo = require('../../models/MyInfo')

const asyncWrapper = require('express-async-handler')
const CustomError = require("../../helpers/error/CustomError")
const NftCollection = require('../../models/NftCollection')

const nftDetail = asyncWrapper(async(req,res,next)=>{
    const nftId = req.params.nftId

    const nft = await NftCollection.findOne(
        {nft_id:nftId}
    ) 

    
    res.status(200).json({
        success: true,
        data: nft
})
})

module.exports=nftDetail