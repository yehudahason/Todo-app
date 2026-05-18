import { useEffect, useState } from "react";
import type { FilterType, TodoList } from "../types/types";
import Footer from "./Footer";

const baseURL = import.meta.env.BASE_URL;

export default function TodoSection() {
  // Initial sample data based on the screenshot
  const [todos, setTodos] = useState<TodoList>(() => start());

  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<FilterType>("all"); // "all" | "active" | "completed"

  // Track the index of the item currently being dragged
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  function start() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        console.error("Error parsing localStorage tasks", e);
      }
    }
    // Fallback to initial sample data if localStorage is empty
    return [
      { id: 1, text: "Complete online JavaScript course", completed: true },
      { id: 2, text: "Jog around the park 3x", completed: false },
      { id: 3, text: "10 minutes meditation", completed: false },
      { id: 4, text: "Read for 1 hour", completed: false },
      { id: 5, text: "Pick up groceries", completed: false },
      { id: 6, text: "Complete Todo App on Frontend Mentor", completed: false },
    ];
  }

  // Add a new todo
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault(); // Prevent form submission reloading
      handleAdd();
    }
  };
  const handleAdd = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (inputValue.trim() === "") return;
    if (e) e.preventDefault(); // Prevent form submission reloading
    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
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

  // --- DRAG AND DROP HANDLERS ---

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Necessary to allow dropping

    if (draggedItemIndex === null || draggedItemIndex === index) return;

    // Reorder the todos array dynamically as the user drags
    const updatedTodos = [...todos];
    const draggedItem = updatedTodos[draggedItemIndex];

    // Remove the item from its original position and insert it at the new target index
    updatedTodos.splice(draggedItemIndex, 1);
    updatedTodos.splice(index, 0, draggedItem);

    setDraggedItemIndex(index);
    setTodos(updatedTodos);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  // ------------------------------

  // Filter logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  // Count active items remaining
  const activeCount = todos.filter((todo) => !todo.completed).length;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <section className="todo-section">
        {/* Input Section */}
        <form className="input-form" onSubmit={(e) => e.preventDefault()}>
          <div
            className="circle"
            aria-label="Circle decorator"
            aria-hidden="true"
          ></div>
          <label htmlFor="new-todo-input" className="sr-only">
            Create a new todo item
          </label>
          <input
            id="new-todo-input"
            name="new-todo-input"
            className="text-preset-1"
            type="text"
            placeholder="Create a new todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="add-button"
            type="button"
            onClick={(e) => handleAdd(e)}
            aria-label="Add task"
          >
            <img src={`${baseURL}/images/add.svg`} alt="add task" />
          </button>
        </form>

        {/* Todo List Card */}
        <div>
          <ul className="todo-list">
            {filteredTodos.map((todo, _) => {
              // Find the global index in the main 'todos' array to handle reordering correctly
              const globalIndex = todos.findIndex((t) => t.id === todo.id);

              return (
                <li
                  key={todo.id}
                  className={`todo-item ${draggedItemIndex === globalIndex ? "dragging" : ""}`}
                  draggable
                  onDragStart={() => handleDragStart(globalIndex)}
                  onDragOver={(e) => handleDragOver(e, globalIndex)}
                  onDragEnd={handleDragEnd}
                >
                  <button
                    className="toggle-button"
                    type="button"
                    onClick={() => toggleTodo(todo.id)}
                    aria-label={
                      todo.completed
                        ? "Mark task as active"
                        : "Mark task as completed"
                    }
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
                    type="button"
                    onClick={() => clearCompleted(todo.id)}
                    aria-label="Delete todo"
                  >
                    <img
                      src={`${baseURL}/images/icon-cross.svg`}
                      alt="Delete icon"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer / Controls Section */}
        <div className="todo-footer">
          <div className="count text-preset-2-regular">
            <span>{activeCount} items left</span>

            <button
              type="button"
              className="text-preset-2-regular"
              onClick={() => clearCompleted()}
            >
              Clear Completed
            </button>
          </div>
          <div className="mobile-filters">
            <nav className="filtersm text-preset-2-regular">
              <button
                type="button"
                className={`text-preset-2-regular ${
                  filter === "all" ? "active" : ""
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`text-preset-2-regular ${
                  filter === "active" ? "active" : ""
                }`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                type="button"
                className={`text-preset-2-regular ${
                  filter === "completed" ? "active" : ""
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </nav>
          </div>
          <h4 className="text-preset-2-bold">Drag and drop to reorder list</h4>
        </div>
      </section>

      <Footer />
    </>
  );
}
