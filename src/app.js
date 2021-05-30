//import packages
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import moment from 'moment-timezone'
import cloudinary from 'cloudinary'



//import routes
import Users from './routes/user.routes'

//settings
const app = express() // instance app from express
dotenv.config({ // ==> config switch environment variables
    path: `.env.${process.env.NODE_ENV}`
})
moment().tz("America/Bogota").format()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

//middlewares
app.use(morgan('dev')) // config logs app
app.use(express.json());
// app.use(express.urlencoded({ extended: false }))
app.use(cors())

//public folder
app.use(express.static(__dirname + '/public'))

//config routes
app.use('/users', Users)

// export default app express
export default app