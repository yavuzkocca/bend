const mongoose = require('mongoose')
const NFTBalancesSchema = require("./NftBalances")
const Schema = mongoose.Schema

const NFTCollectionSchema = new Schema({
  nft_id: {
    type: String,
    default: ''
  },
  contract_address: {
    type: String,
    default:""
  },
  token_id: {
    type: Number,
    default:0
  },
  like_count: {
    type: Number,
    default:0
  },
  token_name: {
    type: String,
    default:""
  },
  token_description: {
    type: String,
    default:""
  },
  token_img_url: {
    type: String,
    default:""
  },
  token_aspect_ratio: {
    type: Number,
    default:0
  },
  creator_id: {
    type: String,
    default:""
  },
  creator_name: {
    type: String,
    default:""
  },
  creator_address: {
    type: String,
    default:""
  },
  creator_img_url: {
    type: String,
    default:""
  },
  creator_username: {
    type: String,
    default:""
  },
  creator_verified: {
    type: Boolean,
    default:false
  },
  comment_count: {
    type: Number,
    default:0
  },
  multiple_owners_list: {
    type: [NFTBalancesSchema],
    default:[]
  },
  chain_name: {
    type: String,
    default:"mumbai"
  },
  edition_size: {
    type: Number,
    default:0
  },
  content_type: {
    type: String,
    default:""
  },
  deadline:{
    type:Number,
    default:0
  },
  has_priv_image:{
    type:Boolean,
    default:false
  }
})

module.exports = mongoose.model('NftCollection', NFTCollectionSchema)