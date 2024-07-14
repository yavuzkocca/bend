const express = require('express')
const router = express.Router()
const { tokenDecode, getUser } = require('../controllers/profile/profileGetters')
const privImageUpload = require('../middlewares/libraries/privImageUpload')
const privImageUploadController = require('../controllers/NFT/privImageUploadController')
const coverImageUpload = require("../middlewares/libraries/coverImageUpload")
const profileCoverUploadController = require('../controllers/profile/profileCoverUploadController')
const editProfile = require("../controllers/profile/editProfile")
const validateUser = require("../controllers/profile/validateUser")
const follow = require("../controllers/follow/follow")
const block = require('../controllers/block/block')
const unblock = require('../controllers/block/unblock')
const unfollow = require('../controllers/follow/unfollow')
const likeNft = require('../controllers/NFT/likeNft')
const unlikeNft = require('../controllers/NFT/unlikeNft')
const notifications = require("./notifications")

router.get('/myinfo', getUser)

router.post(
  '/blur',
  [tokenDecode, privImageUpload.single('privImage')],
  privImageUploadController
)


router.post(
  '/photocover',
  [tokenDecode, coverImageUpload.single('cover_image')],
  profileCoverUploadController
)

router.post("/editname", tokenDecode, editProfile)

router.get("/username_available/:username", validateUser)

router.post("/follow/:_id", tokenDecode, follow)
router.post("/unfollow/:_id", tokenDecode, unfollow)

router.post("/block_profile", tokenDecode, block)
router.post("/unblock_profile", tokenDecode, unblock)

router.post("/likenft/:nftId", tokenDecode, likeNft)
router.post("/unlikenft/:nftId", tokenDecode, unlikeNft)

router.use("/v1", notifications)

module.exports = router

