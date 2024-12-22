import mongoose from 'mongoose';


const DepartmentSchema = mongoose.Schema({
    name : {
        type :String,
        
    },
    Discription :{
        type : String
    }
})

const Department = mongoose.model('Deparments',DepartmentSchema)


export default Department;