const jwt = require('jsonwebtoken')

const getTokenAccess = (req, res, next) => {
  console.log(`Authorization:${req.headers.authorization}`)
  next()
}

const getAccessTokenFromHeader = req => {
  const authorization = req.headers.authorization
  const access_token = authorization.split(' ')[1]
  return access_token
}

module.exports = { getTokenAccess, getAccessTokenFromHeader }
