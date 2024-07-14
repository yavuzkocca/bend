const asyncWrapper = require('express-async-handler')
const MyInfo = require("../../models/MyInfo")
const NftCollection = require("../../models/NftCollection")


const profileNFTs = asyncWrapper(async(req,res,next)=>{
    const profile_id = req.query.profile_id
    const page = req.query.page
    const limit = req.query.limit
    const tab_type = req.query.tab_type
    const sort_type = req.query.sort_type
    const show_hidden = req.query.show_hidden
    const collection_id = req.query.collection_id

    // const response = await MyInfo.find({followers:{$size :{$gt:0}}}).sort({followers:-1}).limit(5)
    const user = await MyInfo.findOne({"profile._id":profile_id})
    const wallet = user.profile.wallet_address
    let NFTs,pNFTs

    if (tab_type == "created"){
        NFTs = await NftCollection.find({creator_address:wallet})
    }else if(tab_type == "owned") {
        pNFTs = await NftCollection.find({multiple_owners_list:{ $elemMatch:{wallet_address:wallet}}})
        NFTs = pNFTs.filter((item) => item.has_priv_image === false);
    }else{
        pNFTs = await NftCollection.find({multiple_owners_list:{ $elemMatch:{wallet_address:wallet}}})
        NFTs = pNFTs.filter((item) => item.has_priv_image === true);
        
    }

    

    const NFTss = {
        items: NFTs,
        has_more:false
    }
    

    res.send(NFTss)

})

module.exports= profileNFTs