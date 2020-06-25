import "@testing-library/jest-dom/";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("should display the sidebar information when rendered", () => {
    const mockSetSelectedCity = jest.fn();
    const { getByText, getByRole, getByPlaceholderText, getAllByRole } = render(
      <MemoryRouter>
        <Sidebar setSelectedCity={mockSetSelectedCity} />
      </MemoryRouter>
    );

    const sidebarMessage = getByText("Select a different city:");
    const citySelectDropdown = getByPlaceholderText("select a city");
    const newTrailsButton = getByRole("button", { name: "Find New Trails" });
    const savedTrailsButton = getByRole("button", { name: "My Saved Trails" });
    const storesMessage = getByText("Local Running Stores:");
    const localStores = getAllByRole("listitem");

    expect(sidebarMessage).toBeInTheDocument();
    expect(citySelectDropdown).toBeInTheDocument();
    expect(newTrailsButton).toBeInTheDocument();
    expect(savedTrailsButton).toBeInTheDocument();
    expect(storesMessage).toBeInTheDocument();
    expect(localStores).toHaveLength(4);
  });

  it("should display an error message if a user tries to view new trails without selecting a city", () => {
    const mockSetSelectedCity = jest.fn();
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <Sidebar setSelectedCity={mockSetSelectedCity} />
      </MemoryRouter>
    );

    const newTrailsButton = getByRole("button", { name: "Find New Trails" });
    fireEvent.click(newTrailsButton);
    const errorMessage = getByText("You must select a city");

    expect(errorMessage).toBeInTheDocument();
  });

  it("should call setSelectedCity with the correct argument when the newTrailsButton is clicked and a city has been selected", () => {
    const mockSetSelectedCity = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <Sidebar setSelectedCity={mockSetSelectedCity} />
      </MemoryRouter>
    );

    const citySelection = getByPlaceholderText("select a city");
    const newTrailsButton = getByRole("button", { name: "Find New Trails" });
    fireEvent.change(citySelection, {
      target: { value: "Broomfield" },
    });
    fireEvent.click(newTrailsButton);

    expect(mockSetSelectedCity).toHaveBeenCalledWith("Broomfield");
  });
});
