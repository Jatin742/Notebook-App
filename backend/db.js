const mongoose = require('mongoose');
const dotenv=require('dotenv').config();
console.log(dotenv.parsed);
const mongoURI=process.env.MONGO_DB_URL;


const connectToMongo=()=> {
    mongoose.connect(mongoURI)
    .then(()=>console.log("Connected to Mongo Successfully"))
    .catch((err)=>console.log(err));
  }

module.exports = connectToMongo ; 