const express=require("express");
const authRouter=require("./routes/auth.route");    

app.use("/auth",authRouter);
app.use(express.json());
app.use(cookieParser());
const app=express(); 


module.exports=app;