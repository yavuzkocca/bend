const asyncWrapper = require('express-async-handler');
const MyInfo = require('../../models/MyInfo');
const NftCollection = require('../../models/NftCollection');

const profileTabs = asyncWrapper(async (req, res, next) => {
  const profileId = req.query.profile_id;

  const user = await MyInfo.findOne({ 'profile._id': profileId });
  const wallet = user.profile.wallet_address;

  const userNFTs = await NftCollection.find({
    creator_address: wallet
  });

  let userNFTss;

  if (userNFTs) {
    userNFTss = userNFTs.map(nft => ({
      collection_id: nft.nft_id,
      collection_name: nft.token_name,
      collection_img_url: nft.token_img_url
    }));
  } else {
    userNFTss = [];
  }

  const created = {
    collections: userNFTss,
    type: 'created',
    name: 'created'
  };

  const ownedNFTs = await NftCollection.find({
    multiple_owners_list: { $elemMatch: { wallet_address: wallet } }
  });

  let ownedNFTss;
  let ownedPublicNFTss

  if (ownedNFTs) {
    ownedPublicNFTss = ownedNFTs.filter((item) => item.has_priv_image === false);
    ownedNFTss = ownedPublicNFTss.map(nft => ({
      collection_id: nft.nft_id,
      collection_name: nft.token_name,
      collection_img_url: nft.token_img_url
    }));
  } else {
    ownedNFTss = [];
  }

  const owned = {
    collections: ownedNFTss,
    name: 'owned',
    type: 'owned'
  };

  

  
  let pownedNFTss;

  

  let ownedPrivNFTss;

if (ownedNFTs) {
  ownedPrivNFTss = ownedNFTs.filter((item) => item.has_priv_image === true);
  pownedNFTss = ownedPrivNFTss.map(nft => ({
    collection_id: nft.nft_id,
    collection_name: nft.token_name,
    collection_img_url: nft.token_img_url
  }));
} else {
  pownedNFTss = [];
}


  

  const ownedPriv = {
    collections: pownedNFTss,
    name: 'PrivNFTS',
    type: 'PrivNFTS'
  };
  console.log(`Priv NFTS ${JSON.stringify(created.collections)}`)

  const profileTabs = {
    default_tab_type: null,
    tabs: [created, owned,ownedPriv]
  };

  res.send(profileTabs);
});

module.exports = profileTabs;
