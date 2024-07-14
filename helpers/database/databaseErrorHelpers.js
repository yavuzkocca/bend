const MyInfo = require('../../models/MyInfo')

const CustomError = require('../helpers/error/CustomError')
const asyncWrapper = require('express-async-handler')

const checkUserExists = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
})
