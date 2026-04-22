const app=require("../index");
const connectDb= require("./config/Mongodb");

app.listen(3000,()=>{
    connectDb();
    console.log("Server is running on port 3000");
})