import "@testing-library/jest-dom/";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import React from "react";
import SavedTrails from "./SavedTrails";

const mockSavedTrails = [
  {
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
];

describe("SavedTrails", () => {
  it("should display the saved trails container when rendered", () => {
    const mockSetSelectedTrail = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <SavedTrails
          savedTrails={[]}
          selectedCity={"Broomfield"}
          setSelectedTrail={mockSetSelectedTrail}
        />
      </MemoryRouter>
    );

    const sectionName = getByText("Saved Trails");
    const noTrailsSavedMessage = getByText(
      "There are currently no trails saved to favorites."
    );

    expect(sectionName).toBeInTheDocument();
    expect(noTrailsSavedMessage).toBeInTheDocument();
  });

  it("should display the trail card when it has been saved to favorites", () => {
    const mockSetSelectedTrail = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <SavedTrails
          savedTrails={mockSavedTrails}
          selectedCity={"Superior"}
          setSelectedTrail={mockSetSelectedTrail}
        />
      </MemoryRouter>
    );

    const savedTrailName = getByText("Boulder Skyline Traverse");

    expect(savedTrailName).toBeInTheDocument();
  });
});
