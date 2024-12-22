import mongoose from "mongoose";
import LeaveType from '../models/LeaveTypeModel.js'




export const AddLeaveTypeFunc = async (req, res) => {
  const { LeaveName, startDate, endDate, Days, status } = req.body;

  
  if (!LeaveName || !startDate || !endDate || !Days || !status) {
    return res.status(400).json({ message: "Please provide all the required fields." });
  }

  try {
   
    const exists = await LeaveType.findOne({ LeaveName: LeaveName });
    if (exists) {
      return res.status(400).json({ message: "This leave type already exists." });
    }

 
    const finaldata = new LeaveType(req.body);
    await finaldata.save();

    res.status(201).json({ message: "Leave Type Saved Successfully" });
  } catch (error) {
    console.error("Error in AddLeaveTypeFunc:", error);
    res.status(500).json({ message: "An error occurred while saving the leave type." });
  }
};




export const LeaveTypeGetFunc = async(req,res)=>{
try {
  const LeaveTypeData = await LeaveType.find({}) 
if(LeaveTypeData){
  res.status(200).json({message:"LeaveTypeData Data found",LeaveTypeData})
}
} catch (error) {
  res.status(400).json({message:error})
}}