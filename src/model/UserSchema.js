const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter your name"],
        trim:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:[true,"Enter Valid email"],
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        minlength:[6,"Password must be at least 6 characters long"],
        select:false
    }
    },{timestamps:true})
    
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const hash=await bcrypt.hash(this.password,10);
    this.password=hash;
    return next();
});
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
};

const User=mongoose.model("User",userSchema);

module.exports=User;
