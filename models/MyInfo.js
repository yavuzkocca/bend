const mongoose = require('mongoose')
const ProfileSchema = require('./Profile')

const Schema = mongoose.Schema



const MyInfoSchema = new Schema({
  followers: {
    type: Array,
    default: []
  },
  followings: {
    type: Array,
    default: []
  },
  followers_count:{
    type:Number,
    default:0
  },
  following_count:{
    type:Number,
    default:0
  },
  profile: {
    type: ProfileSchema,
  },
  likes_nft: {
    type: Array,
    default: []
  },
  likes_comment: {
    type: Array,
    default: []
  },
  comments: {
    type: Array,
    default: []
  },
  blocked_profile_ids: {
    type: Array,
    default: []
  },
  notifications_last_opened: {
    type: String || null,
    default: null
  }
})

// MyInfoSchema.post('save', function (doc, next) {
//   setTimeout(() => {
//     next()
//   }, 5000)
// })

module.exports = mongoose.model('MyInfo', MyInfoSchema)
