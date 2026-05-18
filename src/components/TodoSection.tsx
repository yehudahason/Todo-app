import { useState } from "react";

const baseURL = import.meta.env.BASE_URL;
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
  const clearCompleted = (id?: number) => {
    if (id) {
      setTodos(todos.filter((todo) => todo.id !== id));
      return;
    }
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
    <section className="todo-section">
      {/* Input Section */}
      <form className="input-form ">
        <button
          className="circle"
          disabled
          aria-label="Circle decorator"
        ></button>
        <input
          className="text-preset-1"
          type="text"
          placeholder="Create a new todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>

      {/* Todo List Card */}
      <div>
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <button
                className="toggle-button"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed ? (
                  <div className="icon">
                    <img
                      src={`${baseURL}/images/icon-check.svg`}
                      alt="Check icon for completed todo"
                    />
                  </div>
                ) : (
                  ""
                )}
              </button>
              <span
                className={`task text-preset-1 ${todo.completed ? "completed" : ""}`}
              >
                {todo.text}
              </span>
              <button
                className="delete-button"
                onClick={() => clearCompleted(todo.id)}
              >
                <img
                  src={`${baseURL}/images/icon-cross.svg`}
                  alt="Delete icon"
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Footer / Controls Section */}
      </div>
      <div className="todo-footer">
        <div className="count text-preset-2-regular">
          <span>{activeCount} items left</span>
          <div className="filters text-preset-2-regular">
            <button
              className="text-preset-2-regular"
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className="text-preset-2-regular"
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className="text-preset-2-regular"
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <button
            className="text-preset-2-regular"
            onClick={(_) => clearCompleted()}
          >
            Clear Completed
          </button>
        </div>
      </div>
    </section>
  );
}
