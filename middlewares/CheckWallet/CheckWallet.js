
const MyInfo = require('../../models/MyInfo')

const { register } = require('../../controllers/auth/register')
const {
  login_wallet
} = require('../../controllers/auth/login_wallet')
const asyncWrapper = require('express-async-handler')

const checkWallet = asyncWrapper(async (req, res, next) => {
  const myinfo = await MyInfo.findOne({
    "profile.wallet_address": req.body.address.toLowerCase()
  }).exec()
  console.log(`MyinfoCheck: ${myinfo}`)
  if (myinfo == null) {
    register(req, res, () => {
      login_wallet(req, res, next)
    })
  } else {
    login_wallet(req, res, next)
    console.log('BOK')
  }
})

module.exports = { checkWallet }
