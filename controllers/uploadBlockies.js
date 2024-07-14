const { ThirdwebStorage } = require("@thirdweb-dev/storage");
const fs = require("fs");
const { createCanvas } = require('canvas');
const { renderIcon } = require('@download/blockies');

const uploadBlockie = async (address) => {

    const canvas = createCanvas(50, 50);

    var icon = renderIcon(
        { // All options are optional
            seed: address, // seed used to generate icon data, default: random
            color: '#dfe', // to manually specify the icon color, default: random
            bgcolor: '#aaa', // choose a different background color, default: white
            size: 15, // width/height of the icon in blocks, default: 10
            scale: 3 // width/height of each block in pixels, default: 5
        },
        canvas
    );

    const storage = new ThirdwebStorage({
        secretKey: process.env.THIRDWEB_SECRET_KEY
    });


    const upload = await storage.upload(fs.readFileSync(icon));
    console.log(`Gateway URL - ${storage.resolveScheme(upload)}`);
    return upload
}




module.exports = { uploadBlockie }