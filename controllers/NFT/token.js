const NftCollection = require("../../models/NftCollection")
const asyncWrapper = require('express-async-handler')

const freeNFTDrop = asyncWrapper(async (req, res, next) => {
    
    const contractAddress = req.params.contractAddress
    //console.log(`tokenReqParams:${req.params}`)

    

    const nft = await NftCollection.findOne({
        nft_id : contractAddress
    })
    return res.status(200).json({
        success:true,
        data:nft

    })
})

module.exports=freeNFTDrop