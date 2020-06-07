import React from "react";
import Landing from "./Landing";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("Landing", () => {
  it("should display the form when rendered", () => {
    const mockSetSelectedCity = jest.fn();
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <Landing setSelectedCity={mockSetSelectedCity} />
      </MemoryRouter>
    );

    const welcomeMessage = getByText(
      "Please select a city you would like to run in:"
    );
    const enterButton = getByRole("button", { name: "Find Trails" });

    expect(welcomeMessage).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();
  });

  it("should display an error message if a user tries to enter without selecting a city", () => {
    const mockSetSelectedCity = jest.fn();
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <Landing setSelectedCity={mockSetSelectedCity} />
      </MemoryRouter>
    );

    const enterButton = getByRole("button", { name: "Find Trails" });
    fireEvent.click(enterButton);
    const errorMessage = getByText("You must select a city");

    expect(errorMessage).toBeInTheDocument();
  });

  it("should call setSelectedCity with the correct argument when the enterButton is clicked and a city has been selected", () => {
    const mockSetSelectedCity = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <Landing setSelectedCity={mockSetSelectedCity} />
      </MemoryRouter>
    );

    const citySelection = getByPlaceholderText("select a city");
    const enterButton = getByRole("button", { name: "Find Trails" });
    fireEvent.change(citySelection, {
      target: { value: "Arvada" },
    });
    fireEvent.click(enterButton);

    expect(mockSetSelectedCity).toHaveBeenCalledWith("Arvada");
  });
});
