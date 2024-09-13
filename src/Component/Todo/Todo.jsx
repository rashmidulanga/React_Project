import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editIndex, setEditIndex] = useState(null); // State to track which todo is being edited

  // Add a new Todo or Save Edited Todo
  const handleTodoSubmit = (e) => {
    e.preventDefault();
    if (newTodo.title && newTodo.description) {
      if (editIndex !== null) {
        // Edit existing todo
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = {
          ...newTodo,
          completed: todos[editIndex].completed,
        }; // Preserve completion status
        setTodos(updatedTodos);
        setEditIndex(null); // Reset edit index after saving
      } else {
        // Add new todo
        setTodos([...todos, { ...newTodo, completed: false }]);
      }
      setNewTodo({ title: "", description: "" });
    }
  };

  // Edit a Todo (populate the form for editing)
  const handleEditTodo = (index) => {
    setEditIndex(index); // Set the index of the todo being edited
    setNewTodo(todos[index]); // Populate the form with the selected todo's data
  };

  // Delete a Todo
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(updatedTodos);
    if (editIndex === index) {
      setNewTodo({ title: "", description: "" }); // Reset the form if the edited todo is deleted
      setEditIndex(null);
    }
  };

  // Toggle Completion Status
  const toggleCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h3>Todo List</h3>
      <form onSubmit={handleTodoSubmit} className="addTodoForm">
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          required
        ></textarea>
        <button type="submit" className="btn btn-success">
          {editIndex !== null ? "Save Changes" : "Add Todo"}
        </button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 && <p>No todos available</p>}
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            <h4>{todo.title}</h4>
            <p>{todo.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => toggleCompletion(index)}
            >
              {todo.completed ? "Mark as Incomplete" : "Mark as Completed"}
            </button>
            <button
              className="btn btn-warning"
              onClick={() => handleEditTodo(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
