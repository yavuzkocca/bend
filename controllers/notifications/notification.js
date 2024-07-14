const Notification = require("../../models/Notifications")
const asyncWrapper = require('express-async-handler')

const notification = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // index parametresi query string'den alınır
  const limit = parseInt(req.query.limit) || PAGE_SIZE; // limit parametresi query string'den alınır
  const address = req.query.wallet



  Notification.find({
    notification_owner: address

  }).sort({ _id: -1 }).skip((page - 1) * limit).limit(limit)
    .exec((err, data) => {

      if (err) {
        res.status(500).send('An error occurred');
      } else {
        res.status(200).json(data);
      }

    });

}
)
module.exports = notification