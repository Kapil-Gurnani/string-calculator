import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StringCalcPage from "../src/pages/stringCalcPage";
import { add } from "../src/string-calculator";

// Mock the add function from the string-calculator module
jest.mock("../src/string-calculator", () => ({
  add: jest.fn(),
}));

describe("StringCalcPage", () => {
  it("should update input value on change", () => {
    render(<StringCalcPage />);
    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    fireEvent.change(inputElement, { target: { value: "1,2" } });
    expect(inputElement.value).toBe("1,2");
  });

  it("should display result when add function is called successfully", async () => {
    add.mockImplementation(() => 3);

    render(<StringCalcPage />);

    // Simulate user input and button click
    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    const buttonElement = screen.getByText(/Calculate/i);

    fireEvent.change(inputElement, { target: { value: "1,2" } });
    fireEvent.click(buttonElement);

    // Verify that the `add` function was called with the correct argument
    expect(add).toHaveBeenCalledWith("1,2");

    await waitFor(() => {
      const resultElement = screen.getByText(/Result:/i);
      expect(resultElement.textContent).toBe("Result: 3");
    });
  });

  it("should display error when add function throws an error", async () => {
    add.mockImplementation(() => {
      throw new Error("Invalid input");
    });
    render(<StringCalcPage />);
    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    const buttonElement = screen.getByText(/Calculate/i);
    fireEvent.change(inputElement, { target: { value: "invalid" } });
    fireEvent.click(buttonElement);
    expect(add).toHaveBeenCalledWith("invalid");
    await waitFor(() => {
      const resultElement = screen.getByText(/Error:/i);
      expect(resultElement.textContent).toBe("Error: Invalid input");
    });
  });

  it("should clear error when calculation is successful after an error", async () => {
    add
      .mockImplementationOnce(() => {
        throw new Error("Invalid input");
      })
      .mockImplementationOnce(() => 3);

    render(<StringCalcPage />);
    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    const buttonElement = screen.getByText(/Calculate/i);

    // First attempt - triggers error
    fireEvent.change(inputElement, { target: { value: "invalid" } });
    fireEvent.click(buttonElement);
    await waitFor(() => {
        const resultElement = screen.getByText(/Error:/i);
        expect(resultElement.textContent).toBe("Error: Invalid input");
      });

    // Second attempt - successful calculation
    fireEvent.change(inputElement, { target: { value: "1,2" } });
    fireEvent.click(buttonElement);
    expect(add).toHaveBeenCalledWith("1,2");
    await waitFor(() => {
        const resultElement = screen.getByText(/Result:/i);
        expect(resultElement.textContent).toBe("Result: 3");
        expect(screen.queryByText(/Error:/i)).toBeNull();
      });
  });
});
