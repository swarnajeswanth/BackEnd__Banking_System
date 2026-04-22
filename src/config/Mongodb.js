require("dotenv").config();
const mongoose=require("mongoose");
const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to MongoDb");
    }).catch((err)=>{
        console.log("Error connecting to MongoDb",err);
        process.exit(1);        
    })
};

module.exports=connectDb;
