const NftCollection = require("../../models/NftCollection");
const asyncWrapper = require('express-async-handler');
const moment = require('moment');

const trendingNFTs = async (startDate, endDate) => {
    const nfts = await NftCollection.find({
        createdAt: {
            $gte: startDate,
            $lte: endDate
        }
    }).sort({ "multiple_owners_list.length": -1 }).exec();

    return nfts;
};

const getTrendingNFTs = asyncWrapper(async (req, res, next) => {

    try {
        let startDate, endDate;
        const timeframe = req.query.timeframe;
        switch (timeframe) {
            case 'day':
                startDate = moment().startOf('day');
                endDate = moment().endOf('day');
                break;
            case 'week':
                startDate = moment().startOf('week');
                endDate = moment().endOf('week');
                break;
            case 'month':
                startDate = moment().startOf('month');
                endDate = moment().endOf('month');
                break;
            default:
                throw new Error('Invalid timeframe');
        }

        const nfts = await NftCollection.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        }).sort({ "multiple_owners_list.length": -1 }).exec();

        res.status(200).json(nfts);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});

module.exports = getTrendingNFTs;
