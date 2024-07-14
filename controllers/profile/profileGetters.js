const {
  getAccessTokenFromHeader
} = require('../../middlewares/authorization/authorization')
const asyncWrapper = require('express-async-handler')
const jwt = require('jsonwebtoken')
const MyInfo = require('../../models/MyInfo')


const tokenDecode = (req, res, next) => {
  const accessToken = getAccessTokenFromHeader(req)
  console.log(`ProfileGettersAccessToken:${accessToken}`)
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      req.user = {
        address: decoded.address
      }
      //console.log(JSON.stringify(decoded))
      next()
    }
  )
}

const getUser = asyncWrapper(async (req, res, next) => {
  const wallet = req.query.wallet
  const myinfo = await MyInfo.findOne({
    "profile.wallet_address": wallet
  })
  next()
  res.json({
    data: {
      data: myinfo
    }
  })
})

module.exports = { tokenDecode, getUser }
