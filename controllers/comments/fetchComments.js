const MyInfo = require('../../models/MyInfo')
const Comments = require('../../models/Comments')
const asyncWrapper = require('express-async-handler')
const CustomError = require('../../helpers/error/CustomError')
const NftCollection = require('../../models/NftCollection')

const fetchComments = asyncWrapper(async (req, res, next) => {
  const nftId = req.params.nftId
  const comments = await Comments.find(
    {nft_id:nftId}
  )

  
    res.status(200).json({
    
    data: comments
  })
  
  
})
module.exports=fetchComments