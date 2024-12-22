import express from 'express';
import { AddLeaveTypeFunc, LeaveTypeGetFunc } from '../controller/LeaveTypeController.js';

const router = express.Router()



router.post('/AddLeaveType',AddLeaveTypeFunc);
router.get('/getLeaveType',LeaveTypeGetFunc)

export default router;