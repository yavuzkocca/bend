const Notification = require("../../models/Notifications")
const asyncWrapper = require('express-async-handler')
const MyInfo = require("../../models/MyInfo")
var moment = require('moment');

const rnlot = asyncWrapper(async(req,res,next)=>{
    var epoch = moment().unix();
    const user = await MyInfo.findOneAndUpdate(
        {'profile.wallet_address': req.user.address},
        {
          notifications_last_opened: epoch 
        }
        )

})

module.exports= rnlot