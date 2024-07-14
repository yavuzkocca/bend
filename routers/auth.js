const express = require('express')

const {checkWallet} = require('../middlewares/CheckWallet/CheckWallet')
const router = express.Router()


router.post('/login_wallet', checkWallet)

module.exports = router
