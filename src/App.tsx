import { useEffect, useState } from "react";
import TodoSection from "./components/TodoSection";

function App() {
  const [isDark, setIsDark] = useState(true);
  const baseURL = import.meta.env.BASE_URL;

  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      <header>
        <img
          src={`${baseURL}/images/bg-desktop-${isDark ? "dark" : "light"}.jpg`}
          className={`hero-img ${isDark ? "dark" : ""}`}
          aria-hidden="true"
          alt=""
        />
      </header>
      <main>
        <div className="container">
          <div className="header">
            <h1>TODO</h1>
            <button
              className="theme-toggle"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
            >
              <img
                src={`${baseURL}/images/icon-${isDark ? "sun" : "moon"}.svg`}
                alt="" // Decorative icon, so empty alt is correct alongside aria-label on the button
              />
            </button>
          </div>
          <TodoSection />
        </div>
      </main>
    </>
  );
}

export default App;
