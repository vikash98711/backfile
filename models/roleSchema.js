import mongoose from 'mongoose';


const Role = mongoose.Schema({
    Name :{
        type : String
    },
    Description : {
        type : String
    },
 

})


const Roles = mongoose.model('roles',Role);

export default Roles ;