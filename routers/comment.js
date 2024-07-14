const express = require('express')
const { tokenDecode } = require('../controllers/profile/profileGetters')
const newComment = require('../controllers/comments/newComment')
const fetchComments = require('../controllers/comments/fetchComments')
const likeComment = require('../controllers/comments/likeComment')
const unlikeComment = require('../controllers/comments/unlikeComment')
const deleteComment = require('../controllers/comments/deleteComment')
const router = express.Router()

router.get("/:nftId", fetchComments)
router.post("/newcomment/:nftId", tokenDecode, newComment)
router.post("/likecomment/:commentId", tokenDecode, likeComment)
router.post("/unlikecomment/:commentId", tokenDecode, unlikeComment)
router.post("/deletecomment/:commentId", tokenDecode, deleteComment)




module.exports = router