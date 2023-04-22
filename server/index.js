import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose';
import userRoutes from './routes/user.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet()); // secures HTTP header returned by the express app
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // so that browser blocks no cors
app.use(morgan("common")); 
app.use(cors());

app.use(userRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on PORT: ${process.env.PORT}.`)
    })
    console.log('Connected to MongoDB.')
  }).catch(err => {
    console.log(err)
  })
