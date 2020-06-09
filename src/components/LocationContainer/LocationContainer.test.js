import "@testing-library/jest-dom/";
import { fetchWeather, fetchTrails } from "../../apiCalls";
import { MemoryRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import LocationContainer from "./LocationContainer";
import React from "react";
jest.mock("../../apiCalls.js");

let cityWeather = {
  coord: {
    lon: -105.09,
    lat: 39.8,
  },
  weather: [
    {
      id: 802,
      main: "Clouds",
      description: "scattered clouds",
      icon: "03d",
    },
  ],
  main: {
    temp: 87.13,
    feels_like: 72.1,
    temp_min: 84,
    temp_max: 91.99,
    pressure: 1003,
    humidity: 12,
  },
  name: "Arvada",
};

let cityTrails = {
  trails: [
    {
      id: 7011192,
      name: "Boulder Skyline Traverse",
      summary: "The classic long mountain route in Boulder.",
      difficulty: "black",
      location: "Superior, Colorado",
      url:
        "https://www.trailrunproject.com/trail/7011192/boulder-skyline-traverse",
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
    },
    {
      id: 7000130,
      name: "Bear Peak Out and Back",
      summary: "A must-do run for Boulder locals and visitors alike!",
      difficulty: "black",
      location: "Boulder, Colorado",
      url:
        "https://www.trailrunproject.com/trail/7000130/bear-peak-out-and-back",
      imgSmall:
        "https://cdn2.apstatic.com/photos/hike/7005382_small_1554312030.jpg",
      imgSmallMed:
        "https://cdn2.apstatic.com/photos/hike/7005382_smallMed_1554312030.jpg",
      imgMedium:
        "https://cdn2.apstatic.com/photos/hike/7005382_medium_1554312030.jpg",
      length: 5.7,
      conditionStatus: "All Clear",
      conditionDetails: "Dry",
      conditionDate: "2020-05-22 16:05:31",
    },
    {
      id: 7004226,
      name: "Sunshine Lion's Lair Loop",
      summary:
        "Great Mount Sanitas views are the reward for this gentler loop in Sunshine Canyon.",
      difficulty: "blueBlack",
      location: "Boulder, Colorado",
      url:
        "https://www.trailrunproject.com/trail/7004226/sunshine-lions-lair-loop",
      imgSmall: "",
      imgSmallMed: "",
      imgMedium: "",
      length: 5.3,
      conditionStatus: "All Clear",
      conditionDetails: "Dry - Clear of ice and mud",
      conditionDate: "2020-05-08 14:06:04",
    },
  ],
};

describe("LocationContainer", () => {
  it("should display the selected city name when rendered", () => {
    fetchWeather.mockResolvedValueOnce(cityWeather);
    fetchTrails.mockResolvedValueOnce(cityTrails);
    const mockSetSelectedTrail = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <LocationContainer
          match={"Arvada"}
          selectedCity={"Arvada"}
          setSelectedTrail={mockSetSelectedTrail}
        />
      </MemoryRouter>
    );

    const cityName = getByText("Arvada");

    expect(cityName).toBeInTheDocument();
  });

  it("should get the selected city`s weather", async () => {
    fetchWeather.mockResolvedValueOnce(cityWeather);
    fetchTrails.mockResolvedValueOnce(cityTrails);
    const mockSetSelectedTrail = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <LocationContainer
          match={"Arvada"}
          selectedCity={"Arvada"}
          setSelectedTrail={mockSetSelectedTrail}
        />
      </MemoryRouter>
    );

    const loadingMessage = getByText("Loading...");
    const weatherMessage = await waitFor(() =>
      getByText("The current temperature is 87.13°F")
    );

    expect(loadingMessage).not.toBeInTheDocument();
    expect(weatherMessage).toBeInTheDocument();
  });

  it("should get the selected city`s trails", async () => {
    fetchWeather.mockResolvedValueOnce(cityWeather);
    fetchTrails.mockResolvedValueOnce(cityTrails);
    const mockSetSelectedTrail = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <LocationContainer
          match={"Arvada"}
          selectedCity={"Arvada"}
          setSelectedTrail={mockSetSelectedTrail}
        />
      </MemoryRouter>
    );

    const loadingMessage = getByText("Loading...");
    const trailName = await waitFor(() => getByText("Bear Peak Out and Back"));

    expect(loadingMessage).not.toBeInTheDocument();
    expect(trailName).toBeInTheDocument();
  });
});
