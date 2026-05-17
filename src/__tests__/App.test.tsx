import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  it("should render the heading", () => {
    render(<App />);
    // Adjust the text below to match whatever is actually in your App.tsx
    expect(screen.getByText(/Get started/i)).toBeInTheDocument();
  });
});
