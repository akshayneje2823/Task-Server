import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import router from './routes/authRoute.js';
import { errorHandler } from './middleware/error.js';


dotenv.config({ path: './config/.env' });
const app = express();


// to read req.body data
app.use(express.json());
app.use(cors());
console.log(process.env.MONGO_URL)

const db=mongoose.connection

// connect DB
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)

db.on("error",()=>{
    console.log("eooror occured")
})
db.once("open",()=>{
    console.log("db connected success fully.....")
})
app.use('/api/auth', router)
app.use(errorHandler)


// server
const server = app.listen(process.env.PORT || 8989, () => {
    console.log("server is running " + process.env.PORT)
})


//any error occur
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1))
});
