import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../env.js";

export const register = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:"User Already Exist"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,email,password:hashedPassword,role
        });
         const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(201).json({
        token,
        user: {
            id: user._id,
            name: user.name,
            role: user.role,
        },
        });
       
    }catch(error){
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Provide all Credential"})
        }
        const user = await User.findOne({email});
        if(!user || !user.isActive){
            return res.status(401).json({message:"Invalid Credentials"});
        };
       const  isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const token = jwt.sign(
            {userId:user._id},
            JWT_SECRET,
            {expiresIn:"1d"}
        );

        return res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                role:user.role
            }
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
}