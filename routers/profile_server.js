const express = require('express')
const router = express.Router()
const {profile_serverWallet} = require("../controllers/profile/profile_server")

router.get("/:username",profile_serverWallet)

module.exports = router