const mongoose = require('mongoose')

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('SUCCESFUL')
    })
}
mongoose.set('strictQuery', true)
module.exports = connectDatabase
