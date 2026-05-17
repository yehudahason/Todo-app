<div className="header">
  <h1>TODO</h1>
  <button
    className="theme-toggle"
    onClick={() => setIsDark((prev) => !prev)}
    aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
  >
    <img
      src={`${baseURL}/images/icon-${isDark ? "sun" : "moon"}.svg`}
      alt="" // Decorative icon, so empty alt is correct alongside aria-label on the button
      height={40}
      width={40}
    />
  </button>
</div>;
