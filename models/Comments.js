const mongoose = require('mongoose')
const ProfileSchema = require('./Profile')

const Schema = mongoose.Schema

const CommentsSchema = new Schema({
      added: {
        type: String,
        default:""
      },
      text: {
        type: String,
        default: ""
      },
      commenter_profile_id: {
        type:String,
        default: ""
      },
      nft_id: {
        type:String,
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
      address: {
        type: String,
        default: ""
      },
      username: {
        type: String,
        default: ""
      },
      vertified: {
        type: Boolean,
        default: false
      },
      like_count: {
        type: Number,
        default: 0
      },
      likers: {
        type: Array,
        default: []
      },
      parent_id: {
        type: String,
        default: null
      },
      replies: {
        type: Array,
        default: []
      },
})

module.exports = mongoose.model('Comments', CommentsSchema)

