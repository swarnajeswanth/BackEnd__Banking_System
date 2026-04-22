const express=require("express");
const authController=require("../controller/auth.controller");
const router=express.Router();

router.post("/register",authController.Register);
router.post("/login",authController.Login);

module.exports=router;
