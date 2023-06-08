import mongoose from "mongoose";


export const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    country: String,
    imageLink: String,
    year: Number,
    pages: Number,
    language: String


});

export const Book = mongoose.model('Book', bookSchema)