import express from 'express';
import { DelteRolefunc, GetAllrole, GetSingleRoles, ROleEditfunc, Roleuser } from '../controller/Role.js';
import { userauth } from '../middleware/loginauth.js';
import { departmentdeletefunc, departmentfunc, departmentUpdateFunc, Getdepartmentfunc, GetSingleDepart } from '../controller/Department.js';

const router = express.Router();


router.post('/roles',Roleuser);
router.get('/getrole',userauth,GetAllrole);
// router.get('/singleRole',userauth,GetSingleRoles);
router.get('/singleRole/:id',GetSingleRoles);

router.post('/updateROles/:id',ROleEditfunc);
router.delete('/roleClear/:id',DelteRolefunc)
// router.post('/Login',Setloginfunc);



// department routes starting here 

router.post('/department',departmentfunc);
router.get('/getAlldepartment',userauth,Getdepartmentfunc)
router.get('/singleDepartment/:id',GetSingleDepart)
router.post ('/deparmentUpdate/:id',departmentUpdateFunc)
router.delete('/departmentdelete/:id',departmentdeletefunc)
// department routes ending here 

export default router;