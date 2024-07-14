const { createClient } = require("@urql/core");
const { gql } = require("apollo-server-express");
var moment = require('moment');
const NftCollection = require("./models/NftCollection")
const MyInfo = require("./models/MyInfo")
const Notification = require("./models/Notifications")

const client = createClient({
    url: "https://api.studio.thegraph.com/query/74971/baseonly/v0.0.2"
})

const QUERY = gql`
query freeNFTDrops($createdAt_gte:Int) {
    freeNFTDrops(where: {createdAt_gte: $createdAt_gte}, orderBy: createdAt, orderDirection: asc) {
        id
        creator
        createdAt
        deadline
        name
        imageUrl
        editionSize
        description
        contentType
        hasPrivImage
      }
  }
`

const subGraph = () => {
    setInterval(() => {
        var epoch = moment().unix();
        console.log(`Epoch: ${epoch}`)
        client.query(QUERY, { createdAt_gte: 1720173620 }).toPromise().then(result => {

            if (result) {
                result.data?.freeNFTDrops.map((nft) => {
                    createCollection(nft)
                    sendNotificationToFollowers(nft)
                })
            } else {
                console.log("err")
            }
        })
    }, 5000)
}


const createCollection = async (nft) => {
    const infores = await MyInfo.findOne(
        { "profile.wallet_address": nft.creator }
    )
    const Collection = await NftCollection.findOne({
        nft_id: nft.id
    })
    if (Collection) {
        return console.log("NFT Edition Exists")
    } else {
        await NftCollection.create({
            nft_id: nft.id,
            contract_address: nft.id,
            creator_address: nft.creator,
            token_name: nft.name,
            token_img_url: nft.imageUrl,
            creator_id: infores.profile._id,
            creator_name: infores.profile.name,
            creator_username: infores.profile.username,
            creator_verified: infores.profile.verified,
            creator_img_url: infores.profile.img_url,
            edition_size: nft.editionSize,
            token_description: nft.description,
            content_type: nft.contentType,
            deadline: nft.deadline,
            has_priv_image: nft.hasPrivImage
        })
    }
}

const sendNotificationToFollowers = async (nft) => {
    const infores = await MyInfo.findOne(
        { "profile.wallet_address": nft.creator }
    )
    const notif = await Notification.findOne({ "nfts.nft_id": nft.nft_id })
    if (notif) {
        return console.log("Notification Existsss")
    } else {
        if (infores.followers.length > 0) {
            for (let i = 0; i < infores.followers.length; i++) {
                await Notification.create({
                    img_url: infores.followers[i].profile.img_url,
                    type_name: "NEW_CREATOR_AIRDROP_FROM_FOLLOWING",
                    nft: {
                        nft_id: nft.nft_id,
                        img_url: nft.img_url,
                        name: nft.name,
                        username: infores.profile.username,
                        wallet_address: nft.creator
                    },
                    notification_owner: infores.followers[i].profile.wallet_address
                })
            }
        }
    }
}


module.exports = subGraph










