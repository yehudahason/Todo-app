import { useState } from "react";

export default function TodoSection() {
  // Initial sample data based on the screenshot
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete online JavaScript course", completed: true },
    { id: 2, text: "Jog around the park 3x", completed: false },
    { id: 3, text: "10 minutes meditation", completed: false },
    { id: 4, text: "Read for 1 hour", completed: false },
    { id: 5, text: "Pick up groceries", completed: false },
    { id: 6, text: "Complete Todo App on Frontend Mentor", completed: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"

  // Add a new todo
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  // Toggle todo completion
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Filter logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  // Count active items remaining
  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      {/* Input Section */}
      <div>
        <button disabled aria-label="Circle decorator"></button>
        <input
          type="text"
          placeholder="Create a new todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Todo List Card */}
      <div>
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <button onClick={() => toggleTodo(todo.id)}>
                {todo.completed ? "✓" : ""}
              </button>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer / Controls Section */}
        <div>
          <span>{activeCount} items left</span>

          {/* Filters */}
          <div>
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("active")}>Active</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
          </div>

          <button onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
}
