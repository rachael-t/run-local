import React from "react";
import TrailDetails from "./TrailDetails";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";

const mockSetSavedTrails = jest.fn();

let mockSelectedTrail = {
  trailInfo: {
    conditionDate: "2020-05-27 14:38:34",
    conditionDetails: "Dry",
    conditionStatus: "All Clear",
    difficulty: "black",
    id: 7011192,
    imgMedium:
      "https://cdn2.apstatic.com/photos/hike/7048859_medium_1555540136.jpg",
    imgSmall:
      "https://cdn2.apstatic.com/photos/hike/7048859_small_1555540136.jpg",
    imgSmallMed:
      "https://cdn2.apstatic.com/photos/hike/7048859_smallMed_1555540136.jpg",
    length: 16.3,
    location: "Superior, Colorado",
    name: "Boulder Skyline Traverse",
    summary: "The classic long mountain route in Boulder.",
    url:
      "https://www.trailrunproject.com/trail/7011192/boulder-skyline-traverse",
  },
  city: "Superior",
  setSelectedTrail: "",
};

describe("TrailDetails", () => {
  it("should display the TrailDetails information when rendered", () => {
    const { getByText, getAllByRole, getByRole } = render(
      <MemoryRouter>
        <TrailDetails
          selectedTrail={mockSelectedTrail}
          setSavedTrails={mockSetSavedTrails}
          savedTrails={[]}
        />
      </MemoryRouter>
    );

    const trailName = getByText("Boulder Skyline Traverse");
    const trailDetailsList = getAllByRole("listitem");
    const saveButton = getByRole("button", {
      name: "Save to Favorites",
    });
    const goBackLink = getByRole("link", {
      name: "Go back to view other trails in Superior",
    });

    expect(trailName).toBeInTheDocument();
    expect(trailDetailsList).toHaveLength(4);
    expect(saveButton).toBeInTheDocument();
    expect(goBackLink).toBeInTheDocument();
  });

  it("should call setSavedTrails with the correct argument when the save button is clicked", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <TrailDetails
          selectedTrail={mockSelectedTrail}
          setSavedTrails={mockSetSavedTrails}
          savedTrails={[]}
        />
      </MemoryRouter>
    );

    const saveButton = getByRole("button", {
      name: "Save to Favorites",
    });
    fireEvent.click(saveButton);

    expect(mockSetSavedTrails).toHaveBeenCalledWith(
      mockSelectedTrail.trailInfo
    );
  });

  it("should display a button to remove the trail from favorites if it has already been saved", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <TrailDetails
          selectedTrail={mockSelectedTrail}
          setSavedTrails={mockSetSavedTrails}
          savedTrails={[mockSelectedTrail.trailInfo]}
        />
      </MemoryRouter>
    );

    const removeButton = getByRole("button", {
      name: "Remove from Favorites",
    });

    expect(removeButton).toBeInTheDocument();
  });
});
