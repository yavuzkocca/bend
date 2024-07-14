const express = require('express')
const dotenv = require('dotenv')
const connectDatabase = require('./helpers/database/connectDatabase')
const routers = require('./routers/index')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const customErrorHandler = require('./middlewares/ErrorHandlers/ErrorHandler')
const subGraph = require('./subGraphFreeNFTDrops')
const subBalances = require('./NftBalances')
const {
  getAccessTokenFromHeader
} = require('./middlewares/authorization/authorization')
const jwt = require('jsonwebtoken')
//const main =require("./newEvents")


dotenv.config()
// MONGO DB Connection


connectDatabase()
const app = express()

// Express Body Middleware
app.use(express.json())
// CORS Middleware
app.use(cookieparser())
app.use(cors())
// Error Handler
app.use(customErrorHandler)
//SubGraph
//subGraph()
//SubBalancesGraph and MulOwner Updatee
//subBalances()

const PORT = process.env.PORT

// Routers Middleware
app.use('/api', routers)



app.listen(PORT, () => {
  console.log(`App started at ${PORT}`)
})
