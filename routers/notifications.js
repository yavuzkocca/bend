const express = require('express')
const router = express.Router()

const notification = require('../controllers/notifications/notification');


router.get('/notifications', notification );
module.exports = router