const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const uploadFile = require("../libraries/uploadPrivImageToIPFS.js")

// Görüntüyü bulanıklaştırma fonksiyonu
const blurImage = async (imagePath) => {
    const rootDir = path.dirname(require.main.filename);
    try {
        // Görüntüyü yükle
        const image = await Jimp.read(imagePath);

        // Görüntüyü bulanıklaştır
        image.blur(10); // Burada bulanıklık derecesini ayarlayabilirsiniz

        // Bulanıklaştırılmış görüntüyü belirli bir klasöre kaydet
        const filename = `blurred_${path.basename(imagePath)}`;
        const destinationPath = path.join(`${rootDir}/public/uploads/blurImages`, filename);
        await image.writeAsync(destinationPath);
        const uri = await uploadFile(destinationPath)
        return {
            "uri": uri,
            "destinationPath": destinationPath
        }

        console.log(`Bulanıklaştırılmış görüntü kaydedildi: ${destinationPath}`);
    } catch (error) {
        console.error('Bulanıklaştırma hatası:', error);
    }


};

module.exports = blurImage;
