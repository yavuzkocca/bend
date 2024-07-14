const { createClient } = require('@urql/core')
const { gql } = require('apollo-server-express')
var moment = require('moment')
const NftCollection = require('./models/NftCollection')
const MyInfo = require('./models/MyInfo')
const Notification = require("./models/Notifications.js")

const client = createClient({
  url: 'https://api.studio.thegraph.com/query/74971/baseonly/v0.0.2'
})

const QUERY = gql`
  query freeNFTBalances($updatedAt_gte: Int) {
    freeNFTBalances(where: { updatedAt_gte: $updatedAt_gte }) {
      id
      address
      quantity
      drop {
        id
      }
      updatedAt
    }
  }
`

const subBalances = () => {
  setInterval(() => {
    var epoch = moment().unix()
    console.log(`Epoch:${epoch}`)
    client
      .query(QUERY, { updatedAt_gte: 1704131195 })
      .toPromise()
      .then(result => {
        if (result) {
          result.data.freeNFTBalances.map(balance => {
            const obj = {
              quantity: balance.quantity,
              wallet_address: balance.address
            }
            console.log("Balance" + JSON.stringify(balance))

            updateCollection(balance, obj)
            checkSoldOut(balance)
          })
        }
        // else{
        //     console.log("err")
        // }
      })
  }, 5000)
}

const updateCollection = async (balance, obj) => {
  const res = await NftCollection.findOne({
    "nft_id": balance.drop.id
  })
  console.log("BalanceID" + balance.drop.id)
  console.log("res" + res)
  console.log("BalanceAddress" + balance.address)
  console.log("OBJWallet" + obj.wallet_address)




  const res1 = res.multiple_owners_list.some(
    item => item.wallet_address == obj.wallet_address
  )
  //   console.log(res)
  //   console.log(obj.wallet_address)
  //   console.log(res1)
  const infores = await MyInfo.findOne({
    "profile.wallet_address": obj.wallet_address
  })
  if (!infores) {
    console.log(`No document found for wallet address ${obj.wallet_address}`);
    return;
  }
  console.log("Infores" + infores)
  if (res1 == false) {
    const obj2 = {
      quantity: obj.quantity,
      profile_id: infores.profile._id,
      name: infores.profile.name,
      img_url: infores.profile.img_url,
      username: infores.profile.username,
      verified: infores.profile.verified,
      wallet_address: obj.wallet_address
    }
    await NftCollection.findOneAndUpdate(
      { nft_id: balance.drop.id },
      {
        $push: {
          multiple_owners_list: obj2
        }
      }
    )
  }
}
// Yeni eklendi Sold out olduğunda Notif
const checkSoldOut = async (balance) => {
  const theCollection = await NftCollection.findOne({ nft_id: balance.drop.id })
  const notif = await Notification.findOne({ "nfts.nft_id": balance.drop.id })
  if (theCollection.edition_size == theCollection.multiple_owners_list.length) {
    if (notif) {
      return console.log("Notification Exists")
    } else {
      for (let i = 0; i < theCollection.multiple_owners_list.length; i++) {
        await Notification.create({
          img_url: theCollection.multiple_owners_list[i].img_url,
          type_name: "CREATED_EDITION_SOLD_OUT",
          nfts: [{
            img_url: theCollection.token_img_url,
            name: theCollection.token_name,
            //profile_id: multiple_owners_list[i].profile._id,
            username: theCollection.creator_username,
            wallet_address: theCollection.creator_address,
            nft_id: theCollection.nft_id
          }],
          notification_owner: theCollection.multiple_owners_list[i].wallet_address
        })
      }
    }
  } else {
    return
  }
}

module.exports = subBalances



