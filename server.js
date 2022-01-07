require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload(
    {
        useTempFiles:true
    }
))
//routes
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/productRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/itemRouter'))
app.use('/api',require('./routes/countryRouter'))
app.use('/api', require('./routes/paymentRouter'))

//connect to nosql db(mongodb)

const DBURL = process.env.MONGODB_URL
mongoose.connect(DBURL,err=>{
    if(err) throw err;
    console.log('successfully connected to the MongoDB')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}
app.get('/',(req,res)=>{
    res.json({msg:"welcome to Kavini's workplace"})
})
const PORT = process.env.PORT||5000
app.listen(PORT,()=>{
    console.log("Server is running on port",PORT)
})