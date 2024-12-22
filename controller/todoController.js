import { Todo } from "../models/todoModel.js";

// Fetch all To-Do items for a user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId }).sort("-createdAt");
    res.status(200).json({ success: true, todos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch To-Dos", error: error.message });
  }
};

// Add a new To-Do
export const addTodo = async (req, res) => {
  const { userId, content } = req.body;


  if (!content || !userId) {
    return res.status(400).json({ success: false, message: "Content and userId are required" });
  }

  try {
    const newTodo = new Todo({
      userId,
      content,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json({ success: true, todo: savedTodo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add To-Do", error: error.message });
  }
};

// Delete a To-Do
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ success: false, message: "To-Do not found" });
    }

    res.status(200).json({ success: true, message: "To-Do deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete To-Do", error: error.message });
  }
};

// Update a To-Do (Mark Complete/Update Content)
export const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { content, isCompleted } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { content, isCompleted },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ success: false, message: "To-Do not found" });
    }

    res.status(200).json({ success: true, todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update To-Do", error: error.message });
  }
};
