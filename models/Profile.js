const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  verified: {
    type: Boolean,
    default: false
  },
  img_url: {
    type: String,
    default: ''
  },
  cover_url: {
    type: String,
    default: ''
  },
  minting_enabled: {
    type: Boolean,
    default: false
  },
  wallet_address: {
    type: String,
    unique: true,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  website_url: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  },
  default_list_id: {
    type: Number,
    default: 0
  },
  links: {
    type: Array,
    default: []
  }
})

module.exports = ProfileSchema
