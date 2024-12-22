import express from "express";

// import { authenticate } from "../middleware/authenticate.js";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controller/todoController.js";
import { authenticate } from "../middleware/Todoauthenticate.js";

const router = express.Router();

router.get("/:userId", authenticate, getTodos); 
router.post("/", authenticate, addTodo); 
router.delete("/:todoId", authenticate, deleteTodo); 
router.put("/:todoId", authenticate, updateTodo); 

export default router;
