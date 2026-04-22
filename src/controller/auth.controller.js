const User=require("../model/UserSchema");
const jwt=require("jsonwebtoken");
const Register=async(req,res)=>{
        
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"Please provide all the details"});
        }
        const isExist=await User.findOne({email});
        if(isExist){
            return res.status(400).json({message:"User already exists"});
        }

        const user=await User.create({name,email,password});
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token);
        return res.status(201).json({message:"User registered successfully",user:{
            _id:user._id,
            name:user.name,
            email:user.email,
        },
        token
    });
}

const Login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please provide all the details"});
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid email or password"});
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("token",token);
    return res.status(200).json({message:"User logged in successfully",user:{
        _id:user._id,
        name:user.name,
        email:user.email,
    },
    token:token
});
}

module.exports={Register,Login};