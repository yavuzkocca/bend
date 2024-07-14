const MyInfo = require('../../models/MyInfo')
const asyncWrapper = require('express-async-handler')

const editProfile = asyncWrapper(
  async (req, res, next) => {
    const newValues = req.body.newValues;
    const profileIpfsHash = req.body.profileIpfsHash;
    const coverIpfsHash = req.body.coverIpfsHash;

    const updateFields = {
      "profile.name": newValues.name,
      "profile.username": newValues.username,
      "profile.bio": newValues.bio,
      "profile.website_url": newValues.website_url,
    };

    if (profileIpfsHash && profileIpfsHash.length > 0) {
      updateFields["profile.img_url"] = profileIpfsHash[0];
    }

    if (coverIpfsHash && coverIpfsHash.length > 0) {
      updateFields["profile.cover_url"] = coverIpfsHash[0];
    }

    const user = await MyInfo.findOneAndUpdate(
      { "profile.wallet_address": req.user.address },
      updateFields,
      { new: true, runValidators: true }
    );

    console.log(`Name:${updateFields["profile.cover_url"]}`);
    console.log(`Name:${newValues.name}`);

    res.status(200).json({
      success: true,
      message: 'Edit success',
      data: user
    });

    next();
  }
);

module.exports = editProfile;
