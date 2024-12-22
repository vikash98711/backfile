import mongoose from 'mongoose';
import Department from '../models/DepartmentSchema.js';



export const departmentfunc = async (req,res)=>{
    const {name,Discription} = req.body
    try {

        if(!name || !Discription ){
            return res.status(400).json({message :"please provide all the filed"})
        }
        const existsdata = await Department.findOne({name})
        if (existsdata) {
          return  res.status(400).json({message:"this department is already saved"})
        }

 const finaldata = new Department(req.body);
 await finaldata.save();
  return res.status(200).json({message: "Data saved Successfully"})
        
    } catch (error) {
        res.status(400).json({message:"There are some error"})
    }
}
 

export const Getdepartmentfunc = async (req,res)=>{
    try {
        const resultdata = await Department.find({})
        if(resultdata){
          return  res.status(200).json({message:'Department Data found',resultdata})
        }
    } catch (error) {
       res.status(400).json({message:'Data not found'}) 
    }
}


export const GetSingleDepart = async (req,res)=>{
    const {id} = req.params

    
    try {
        const singledepartment =  await Department.findOne({_id : id})
       
        
        if(!singledepartment){
            res.status(401).json({message:"data not found in Database"})
        }
        res.status(200).json({message:'Data Found Sucessfully',singledepartment})
    } catch (error) {
        res.status(400).json({message:"data not found"})
    }
}


export const departmentUpdateFunc = async (req,res)=>{
    const {id} = req.params
    const Departmentdata = req.body
    try {
        const resultdata = new Department(Departmentdata)
        await Department.updateOne({_id : id},resultdata)
        res.status(200).json({message:'Data Updated Successfully'})
    } catch (error) {
        res.status(400).json({message:'Data Not updated'})
    }
}



export const departmentdeletefunc = async (req,res)=>{
    const {id} = req.params
    try {
         await Department.deleteOne({_id : id})
        res.status(200).json({message:'Data delted Successfully'})
    } catch (error) {
        res.status(400).json({message:'data not deleted'})
    }
}