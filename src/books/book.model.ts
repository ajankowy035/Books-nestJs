import * as mongoose from "mongoose";

export const BookSchema = new mongoose.Schema({
    title: {type: String, require: true},
    desc: {type: String, require: true},
    author: {type: String, require: true},
    price: {type: Number, require: true}
})

export interface Book extends mongoose.Document{
    id: string;
    title: string;
    desc: string; 
    author: string;
    price: number;
}