import User from "../models/userModel.js";

export const getDoctor = async(req,res)=>{
    try{
        const doctors = await User.find({role:'doctor'});
        if(!doctors){
            return res.status(400).json({message:"no doctor"});
        };
        res.json(doctors);
    }catch(error){
       console.log(error);
       res.status(500).json({message:error.message}); 
    }
}