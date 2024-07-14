const mongoose = require('mongoose')

const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    img_url: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    type_name: {
        type: String,
        default: null
    },
    to_timestamp: {
        type: String,
        default: null
    },
    comment_id: {
        type: String,
        default: null
    },
    actor: {
        type: Schema.Types.Mixed,
        default: {}
    },
    nft: {
        type: Schema.Types.Mixed,
        default: {}
    },
    notification_owner: {
        type: String,
        default: ''
    },
})

// MyInfoSchema.post('save', function (doc, next) {
//   setTimeout(() => {
//     next()
//   }, 5000)
// })

module.exports = mongoose.model('Notification', NotificationSchema)