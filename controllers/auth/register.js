const MyInfo = require('../../models/MyInfo')
const Profile = require('../../models/Profile')
const asyncWrapper = require('express-async-handler')

const { ThirdwebStorage } = require("@thirdweb-dev/storage");
const fs = require("fs");
const path = require('path')
const { createCanvas } = require('canvas');
const { renderIcon } = require('@download/blockies');


const register = asyncWrapper(async (req, res, next) => {
  const {
    address,
    followers,
    followings,
    likes_nft,
    likes_comment,
    comments,
    blocked_profile_ids,
    notifications_last_opened,
    daily_claim_limit,
    claim_tank,
    name,
    verified,
    img_url,
    cover_url,
    minting_enabled,
    bio,
    website_url,
    username,
    default_list_id,
    default_created_sort_id,
    default_owned_sort_id,
    has_onboarded,
    links
  } = req.body
  const upload = await uploadBlockie(address)
  // const profile = await Profile.create({
  //   name,
  //   verified,
  //   img_url,
  //   cover_url,
  //   minting_enabled,
  //   wallet_address: address,
  //   bio,
  //   website_url,
  //   username,
  //   default_list_id,
  //   default_created_sort_id,
  //   default_owned_sort_id,
  //   notifications_last_opened,
  //   has_onboarded,
  //   links
  // })
  const myinfo = await MyInfo.create({
    followers,
    followings,
    profile: {
      name,
      verified,
      img_url: upload,
      cover_url,
      minting_enabled,
      wallet_address: address.toLowerCase(),
      bio,
      website_url,
      username,
      default_list_id,
      default_created_sort_id,
      default_owned_sort_id,
      notifications_last_opened,
      has_onboarded,
      links
    },
    likes_nft,
    likes_comment,
    comments,
    blocked_profile_ids,
    notifications_last_opened,
    daily_claim_limit,
    claim_tank
  })
  console.log(`MyInfo:${myinfo}`)


  next()
  // res.status(200).json({
  //   success: true,
  //   data: myinfo
  // })
})

const uploadBlockie = async (address) => {
  console.log(`BLCA ${address}`)
  const canvas = createCanvas(50, 50);

  var icon = renderIcon(
    { // All options are optional
      seed: address, // seed used to generate icon data, default: random
      size: 15, // width/height of the icon in blocks, default: 10
      scale: 3 // width/height of each block in pixels, default: 5
    },
    canvas
  );

  const storage = new ThirdwebStorage({
    secretKey: process.env.THIRDWEB_SECRET_KEY
  });


  // İkonu canvas'ten alıp base64 formatına dönüştürüyoruz.
  // İkonu canvas'ten alıp base64 formatına dönüştürüyoruz.
  const base64Icon = icon.toDataURL("image/png").replace(/^data:image\/png;base64,/, "");

  // Base64 verisini Buffer'a dönüştürüyoruz.
  const bufferIcon = Buffer.from(base64Icon, 'base64');

  // 'uploads' adında bir klasör oluşturuyoruz (eğer yoksa).
  const directory = 'uploads';
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  // İkonu 'uploads' klasörü içindeki 'icon.png' dosyasına yazıyoruz.
  fs.writeFileSync(path.join(directory, `${address}.png`), bufferIcon);

  // İkonun dosya yolunu döndürüyoruz.
  //return path.join(directory, "icon.png");

  const image = path.join(__dirname, `../../uploads/${address}.png`)
  const upload = await storage.upload(fs.readFileSync(image));
  fs.unlinkSync(image)
  return `${storage.resolveScheme(upload)}`
}

module.exports = { register }
