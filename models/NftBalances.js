const mongoose = require('mongoose')

const Schema = mongoose.Schema

const NFTBalancesSchema = new Schema({
  quantity: {
    type: Number,
    default: 0
  },
  profile_id: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  img_url: {
    type: String,
    default: ""
  },
  username: {
    type: String,
    default: ""
  },
  verified: {
    type: Boolean,
    default: false
  },
  wallet_address: {
    type: String,
    default: ""
  }
})

module.exports = NFTBalancesSchema
