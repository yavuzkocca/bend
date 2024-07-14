const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const uploadFile = require("../libraries/uploadPrivImageToIPFS.js")

// ffmpeg ve ffprobe yollarını yapılandırma
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const blurVideo = async (videoPath) => {
    const framePath = path.join(__dirname, 'firstFrame.jpg');

    // Video dosyasından ilk frame'i çıkar
    await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .on('end', resolve)
            .on('error', reject)
            .screenshots({
                count: 1,
                folder: path.dirname(framePath),
                filename: path.basename(framePath)
            });
    });

    // İlk frame'i bulanıklaştır
    const blurredImagePath = framePath.replace('.jpg', '-blurred.jpg');
    const image = await Jimp.read(framePath);
    await image.blur(10).writeAsync(blurredImagePath);
    const uri = await uploadFile(blurredImagePath)
    // İlk frame'i sil
    fs.unlink(framePath, (err) => {
        if (err) {
            console.error('İlk frame silinirken bir hata oluştu:', err);
        } else {
            console.log('İlk frame başarıyla silindi.');
        }
    });
    return {
        "uri": uri,
        "destinationPath": blurredImagePath
    }
};

module.exports = blurVideo;
