import mongoose from 'mongoose';


const TodoSchema = mongoose.Schema({
    Name :{
        type: String
    }
})

const TodoModel = mongoose.model("todo",TodoSchema);
export default TodoModel