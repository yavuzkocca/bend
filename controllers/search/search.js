const asyncWrapper = require('express-async-handler')
const MyInfo = require("../../models/MyInfo")


const search = asyncWrapper(async(req,res,next)=>{
    // function escapeRegex(text) {
    //     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    // };
    // if (req.query.search) {
    //     const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    //     Jobs.find({ "name": regex }, function(err, foundjobs) {
    //         if(err) {
    //             console.log(err);
    //         } else {
    //            res.render("jobs/index", { jobs: foundjobs });
    //         }
    //     }); 
    //  }

    const response = await MyInfo.find({ "profile.username": { $regex: new RegExp('^' + req.query.q, 'i') } }).sort('username').exec();
    // find({ "profile.username": req.query.q }); 

    const users = response.map(user =>({
        id : user._id,
        name: user.profile.name,
        username: user.profile.username,
        verified: user.profile.verified,
        img_url: user.profile.img_url,
        address0: user.profile.wallet_address
    }))

    // const data = {
    //     id : response._id,
    //     name: response.profile.name,
    //     username: response.profile.username,
    //     verified: response.profile.verified,
    //     img_url: response.profile.img_url,
    //     address0: response.profile.wallet_address
    // }
       
    res.json({data:users})
    
})

module.exports= search