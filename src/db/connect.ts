import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

// const uri = process.env.URI||'mongodb://localhost:27017'

export const connect = (url: any) =>{
   return mongoose.connect(url)
}




