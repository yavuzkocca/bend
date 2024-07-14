const NftCollection = require("../../models/NftCollection")
const asyncWrapper = require('express-async-handler')

const freeNFTDrops = asyncWrapper(async (req, res, next) => {
    const nfts = await NftCollection.find()

    res.status(200).json({
    success: true,
    data: nfts
  })

})

module.exports = freeNFTDrops
