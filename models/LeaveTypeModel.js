import mongoose from 'mongoose';

const leaveTypeSchema = new mongoose.Schema({
  LeaveName: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  Days: {
    type: Number,
    required: true,
  },
  status:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LeaveType = mongoose.model('LeaveType', leaveTypeSchema);

export default LeaveType;
