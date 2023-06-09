import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: './env' });


export const connectDB = async () => {
    mongoose.connect("mongodb+srv://bookstoretask:Gs7gnrOCpXQIJuie@cluster0.zxr08qt.mongodb.net/")
        .then((res) => {
            console.log("connected DB")
        }).catch((err) => {
            console.log(err)
        })



    }