const { ThirdwebStorage } = require("@thirdweb-dev/storage");
const { readFileSync } = require("fs");

const storage = new ThirdwebStorage({
    secretKey: "tkAeQK8TiELRw0zZ-i5pTucZ8Ue4QicIVRdezs-nXU34t1PrL2swdzV77LU1adgj04wUut6zIkV1YqzlcPfOYQ", // You can get one from dashboard settings
});


// Middleware fonksiyonunu oluştur
const uploadFile = async (path) => {
    try {
        // Dosyayı oku 
        const file = readFileSync(path);

        // Dosyayı yükle ve yükleme URI'sini al
        const uri = await storage.upload(file);

        // Yükleme URI'sini request objesine ekle (istersek)
        const cleanUri = uri.replace('ipfs://', '')
        console.log(`IPFS FILE URI ${cleanUri}`)

        return cleanUri



        // Sonraki middleware'e geç

    } catch (error) {
        // Hata durumunda uygun bir yanıt ver
        console.error('Dosya yükleme hatası:', error);
        res.status(500).json({ error: 'Dosya yüklenirken bir hata oluştu.' });
    }
};

module.exports = uploadFile;
