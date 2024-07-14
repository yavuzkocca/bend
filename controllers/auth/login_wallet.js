const jwt = require('jsonwebtoken')
const { register } = require('./register')
const MyInfo = require('../../models/MyInfo')

const CustomError = require('../../helpers/error/CustomError')
const asyncWrapper = require('express-async-handler')

const login_wallet = asyncWrapper(async (req, res, next) => {
  const { signature } = req.body
  const address = req.body.address.toLowerCase()

  if (address && signature) {
    // creating a access token
    const accessToken = jwt.sign(
      {
        address: address
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '100d'
      }
    )
    // Creating refresh token not that expiry of refresh
    // token is greater than the access token

    console.log(`Accesstoken = ${accessToken}`)

    const refreshToken = jwt.sign(
      {
        address: address
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '100d' }
    )

    const wallet = req.body.address
    const myinfo = await MyInfo.findOne({
      "profile.wallet_address": req.body.address
    })

    console.log(`RefreshToken = ${myinfo}`)

    return res.json({ accessToken, refreshToken, myinfo, wallet })
  }
})

module.exports = { login_wallet }
