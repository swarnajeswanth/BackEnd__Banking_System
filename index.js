const express=require("express");
const authRouter=require("./src/routes/auth.route");    
const cookieParser=require("cookie-parser");
const app=express(); 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/auth",authRouter);


module.exports=app;