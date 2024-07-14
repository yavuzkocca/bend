const NftCollection = require("../../models/NftCollection")
const asyncWrapper = require('express-async-handler')

const refreshNftMetadata = asyncWrapper(async (req, res, next) => {
    nft_idd = req.params.nft_id

    const nft = await NftCollection.findOne(
        {nft_id:nft_idd}
        )

        console.log(`NFTMetadata:${nft}`)

        res.status(200).json({
            success: true,
            data: nft
          })


})

module.exports=refreshNftMetadata