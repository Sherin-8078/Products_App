const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
require('dotenv').config()
const connectDB = require('./db/connection')
connectDB()
const productRoute = require('./Routes/productRoutes')
const userRoutes = require('./Routes/userRoutes')

const morgan = require('morgan')
app.use(morgan('dev'))

app.use('/product',productRoute)
app.use('/user',userRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`App is listening in PORT ${process.env.PORT}`)
})