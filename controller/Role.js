import Roles  from '../models/roleSchema.js'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Department from '../models/DepartmentSchema.js';

export const Roleuser = async(req,res)=>{
    const {Name,Description} = req.body;
    try {
        if(!Name || !Description){
           return  res.status(400).json({message:"please provide all the fileds"})
            
            
        }
     
        const existsRole = await Roles.findOne({Name :Name});
        if(existsRole){
           return  res.status(400).json({message:"This Role is already saved in database"})
        }

        const finalresult = new Roles(req.body);
           await finalresult.save();
           res.status(201).json({message: "Datasaved Succesfully"})
     
        
    } catch (error) {
       res.status(400).json({message:"there is some error on catch"}) 
    }
}


export const GetAllrole = async(req, res)=>{
    
    try {
        const result = await Roles.find();
        const deparment = await Department.find();

        
        if(result){
            res.status(200).json({message:"Data searching sucessfully",result})
        }
    } catch (error) {
        res.status(200).json({message: "there is something wrong on GetAllrole function",error})
    }
}




export const GetSingleRoles = async (req, res) => {
const {id} = req.params
console.log("id",id);

   
    

    try {
      
     

        
        const data = await Roles.findOne({_id : id});
        if(!data){
            return res.status(200).json({message:"not data found"})
        }
        res.status(200).json({ message: "Data found successfully",data});
    } catch (error) {
        res.status(500).json({ message: "Error fetching the role", error: error.message });
    }
};



 export const ROleEditfunc = async (req,res)=>{
    console.log(req.body);
    
    const roledata = req.body
    const {id} = req.params

    const finalresult = new Roles(roledata)
    try {
        await  Roles.updateOne({_id : id},finalresult)
        res.status(200).json({message:'Data updated sucessfully'})
    } catch (error) {
        res.status(400).json({message:"something wrong on roldeeeditfunc"})
    }
}


export const DelteRolefunc = async (req, res)=>{
    const {id} = req.params
    console.log(id);
    
    try {
        await Roles.deleteOne({_id :id})
        return res.status(200).json({message:'Data deleted Successfully'})
        
    } catch (error) {
        res.status(400).json({message:"Data not deleted"})
        
    }
}


// export const Setloginfunc = async (req,res)=>{
//     const {Email} = req.body
//     try {
//         const user = await Roles.findOne({Email});
       
//       const verifiedtoken =  await jwt.sign({user},"abcd")
//         console.log("verifiedtoken",verifiedtoken);
//        return res.status(200).json({message:"sucess",token:verifiedtoken})
        
//     } catch (error) {
//         console.log(error.message);
        
//         res.status(400).json({message:error.message})
        

//     }
// }