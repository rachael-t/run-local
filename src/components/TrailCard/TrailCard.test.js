import React from "react";
import TrailCard from "./TrailCard";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";

const mockSetSelectedTrail = jest.fn();

let trailDetails = {
  id: 7011192,
  name: "Boulder Skyline Traverse",
  summary: "The classic long mountain route in Boulder.",
  difficulty: "black",
  location: "Superior, Colorado",
  url: "https://www.trailrunproject.com/trail/7011192/boulder-skyline-traverse",
  imgSmall:
    "https://cdn2.apstatic.com/photos/hike/7048859_small_1555540136.jpg",
  imgSmallMed:
    "https://cdn2.apstatic.com/photos/hike/7048859_smallMed_1555540136.jpg",
  imgMedium:
    "https://cdn2.apstatic.com/photos/hike/7048859_medium_1555540136.jpg",
  length: 16.3,
  conditionStatus: "All Clear",
  conditionDetails: "Dry",
  conditionDate: "2020-05-27 14:38:34",
};

let mockProps = {
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
  setSelectedTrail: mockSetSelectedTrail,
};

describe("TrailCard", () => {
  it("should display the TrailCard information when rendered", () => {
    const { getByText, getByAltText, getByRole } = render(
      <MemoryRouter>
        <TrailCard
          key={7011192}
          trailInfo={trailDetails}
          city={"Superior"}
          setSelectedTrail={mockSetSelectedTrail}
        />
      </MemoryRouter>
    );

    const trailName = getByText("Boulder Skyline Traverse");
    const trailImage = getByAltText("view of trail");
    const trailDetailsButton = getByRole("button", {
      name: "View Trail Details",
    });

    expect(trailName).toBeInTheDocument();
    expect(trailImage).toBeInTheDocument();
    expect(trailDetailsButton).toBeInTheDocument();
  });

  it("should call setSelectedTrail with the correct argument when the view trail details button is clicked", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <TrailCard
          key={7011192}
          trailInfo={trailDetails}
          city={"Superior"}
          setSelectedTrail={mockSetSelectedTrail}
        />
      </MemoryRouter>
    );

    const trailDetailsButton = getByRole("button", {
      name: "View Trail Details",
    });
    fireEvent.click(trailDetailsButton);

    expect(mockSetSelectedTrail).toHaveBeenCalledWith(mockProps);
  });
});
