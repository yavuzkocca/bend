// privImageUploadController.js

const fs = require('fs');

const blurVideo = require('../../middlewares/libraries/blurVideo');
const blurImage = require('../../middlewares/libraries/blurImage');

const privImageUploadController = async (req, res, next) => {
  try {

    console.log(req.file)
    const filePath = req.file.path;


    const fileType = req.file.mimetype.split('/')[0];

    let blurredImagePath;

    if (fileType === 'image') {
      // Görüntüyü bulanıklaştır
      blurredImagePath = await blurImage(filePath);
    } else if (fileType === 'video' && (req.file.mimetype === 'video/mp4' || req.file.mimetype === 'video/webm')) {
      // Videoyu bulanıklaştır
      blurredImagePath = await blurVideo(filePath);
    }
    console.log(`Bluurreed ${blurredImagePath}`)

    const data = {
      IPFSHash: blurredImagePath.uri,
      type: fileType
    };

    // İşlem tamamlandı, başarıyla yanıt ver
    res.json(data);

    // Orijinal dosyayı ve bulanıklaştırılmış görüntüyü sil
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Orijinal dosya silinirken bir hata oluştu:', err);
      } else {
        console.log('Orijinal dosya başarıyla silindi.');
      }
    });

    fs.unlink(blurredImagePath.destinationPath, (err) => {
      if (err) {
        console.error('Bulanıklaştırılmış görüntü silinirken bir hata oluştu:', err);
      } else {
        console.log('Bulanıklaştırılmış görüntü başarıyla silindi.');
      }
    });
  } catch (error) {
    // Hata durumunda uygun bir yanıt ver
    console.error('İşlem hatası:', error);
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }
};

module.exports = privImageUploadController;
