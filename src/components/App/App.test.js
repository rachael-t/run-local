import React from "react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { fetchWeather, fetchTrails } from "../../apiCalls";
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

describe("App", () => {
  it("should display the app and landing form when the page loads", () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    //App and Landing components rendered
    const appName = getByText("Run Local");
    const citySelection = getByPlaceholderText("select a city");
    const enterButton = getByRole("button", { name: "Find Trails" });

    expect(appName).toBeInTheDocument();
    expect(citySelection).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();
  });

  it("should load the selected city`s weather and trails when Find Trails has been clicked", async () => {
    fetchWeather.mockResolvedValueOnce(cityWeather);
    fetchTrails.mockResolvedValueOnce(cityTrails);
    const { getByText, getAllByText, getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    //App and Landing components rendered
    const citySelection = getByPlaceholderText("select a city");
    const enterButton = getByRole("button", { name: "Find Trails" });
    fireEvent.change(citySelection, {
      target: { value: "Arvada" },
    });
    fireEvent.click(enterButton);
    //Sidebar, LocationContainer and TrailCard components rendered
    const sidebarMessage = getByText("Select a different city:");
    const cityName = await waitFor(() => getAllByText("Arvada"));
    const weatherMessage = await waitFor(() =>
      getByText("The current temperature is 87.13°F")
    );
    const trailName = await waitFor(() =>
      getByText("Sunshine Lion's Lair Loop")
    );

    expect(sidebarMessage).toBeInTheDocument();
    expect(cityName[1]).toBeInTheDocument();
    expect(weatherMessage).toBeInTheDocument();
    expect(trailName).toBeInTheDocument();
  });

  it("should load the selected trail`s details when View Trail Details has been clicked", async () => {
    fetchWeather.mockResolvedValueOnce(cityWeather);
    fetchTrails.mockResolvedValueOnce(cityTrails);
    const {
      getByText,
      getAllByText,
      getByPlaceholderText,
      getByRole,
      getAllByRole,
    } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    //App and Landing components rendered
    const citySelection = getByPlaceholderText("select a city");
    const enterButton = getByRole("button", { name: "Find Trails" });
    fireEvent.change(citySelection, {
      target: { value: "Arvada" },
    });
    fireEvent.click(enterButton);
    //LocationContainer and TrailCard components rendered
    const cityName = await waitFor(() => getAllByText("Arvada"));
    const weatherMessage = await waitFor(() =>
      getByText("The current temperature is 87.13°F")
    );
    const trailName = await waitFor(() => getByText("Bear Peak Out and Back"));
    const trailDetailsButton = getAllByRole("button", {
      name: "View Trail Details",
    });
    fireEvent.click(trailDetailsButton[1]);
    //Sidebar and TrailDetails component rendered
    const sidebarMessage = getByText("Select a different city:");
    const trailSummary = getByText(
      "A must-do run for Boulder locals and visitors alike!"
    );
    const saveButton = getByRole("button", {
      name: "Save to Favorites",
    });
    const goBackLink = getByRole("link", {
      name: "Go back to view other trails in Arvada",
    });

    expect(sidebarMessage).toBeInTheDocument();
    expect(trailSummary).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(goBackLink).toBeInTheDocument();
  });

  it("should update the save button text when Save to Favorites has been clicked", async () => {
    fetchWeather.mockResolvedValueOnce(cityWeather);
    fetchTrails.mockResolvedValueOnce(cityTrails);
    const {
      getByText,
      getAllByText,
      getByPlaceholderText,
      getByRole,
      getAllByRole,
    } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    //App and Landing components rendered
    const citySelection = getByPlaceholderText("select a city");
    const enterButton = getByRole("button", { name: "Find Trails" });
    fireEvent.change(citySelection, {
      target: { value: "Arvada" },
    });
    fireEvent.click(enterButton);
    //LocationContainer and TrailCard components rendered
    const cityName = await waitFor(() => getAllByText("Arvada"));
    const weatherMessage = await waitFor(() =>
      getByText("The current temperature is 87.13°F")
    );
    const trailName = await waitFor(() => getByText("Bear Peak Out and Back"));
    const trailDetailsButton = getAllByRole("button", {
      name: "View Trail Details",
    });
    fireEvent.click(trailDetailsButton[1]);
    //Sidebar and TrailDetails component rendered
    const sidebarMessage = getByText("Select a different city:");
    const saveButton = getByRole("button", {
      name: "Save to Favorites",
    });
    fireEvent.click(saveButton);
    const removeButton = getByRole("button", {
      name: "Remove from Favorites",
    });

    expect(sidebarMessage).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });

  it("should display the saved trail card when the My Saved Trails button is clicked", async () => {
    fetchWeather.mockResolvedValueOnce(cityWeather);
    fetchTrails.mockResolvedValueOnce(cityTrails);
    const {
      getByText,
      getAllByText,
      getByPlaceholderText,
      getByRole,
      getAllByRole,
    } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    //App and Landing components rendered
    const citySelection = getByPlaceholderText("select a city");
    const enterButton = getByRole("button", { name: "Find Trails" });
    fireEvent.change(citySelection, {
      target: { value: "Arvada" },
    });
    fireEvent.click(enterButton);
    //Sidebar, LocationContainer and TrailCard components rendered
    const cityName = await waitFor(() => getAllByText("Arvada"));
    const weatherMessage = await waitFor(() =>
      getByText("The current temperature is 87.13°F")
    );
    const trailName = await waitFor(() => getByText("Bear Peak Out and Back"));
    const trailDetailsButton = getAllByRole("button", {
      name: "View Trail Details",
    });
    fireEvent.click(trailDetailsButton[1]);
    //Sidebar and TrailDetails component rendered
    const saveButton = getByRole("button", {
      name: "Save to Favorites",
    });
    fireEvent.click(saveButton);
    const savedTrailsButton = getByRole("button", { name: "My Saved Trails" });
    fireEvent.click(savedTrailsButton);
    //Sidebar and SavedTrails component rendered
    const sidebarMessage = getByText("Select a different city:");
    const savedTrailName = getByText("Bear Peak Out and Back");
    const savedTrailDetailsButton = getByRole("button", {
      name: "View Trail Details",
    });

    expect(sidebarMessage).toBeInTheDocument();
    expect(savedTrailName).toBeInTheDocument();
    expect(savedTrailDetailsButton).toBeInTheDocument();
  });

  it("should allow a user to remove a saved trail from favorites", async () => {
    fetchWeather.mockResolvedValueOnce(cityWeather);
    fetchTrails.mockResolvedValueOnce(cityTrails);
    const {
      getByText,
      getAllByText,
      getByPlaceholderText,
      getByRole,
      getAllByRole,
    } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    //App and Landing components rendered
    const citySelection = getByPlaceholderText("select a city");
    const enterButton = getByRole("button", { name: "Find Trails" });
    fireEvent.change(citySelection, {
      target: { value: "Arvada" },
    });
    fireEvent.click(enterButton);
    //Sidebar, LocationContainer and TrailCard components rendered
    const cityName = await waitFor(() => getAllByText("Arvada"));
    const weatherMessage = await waitFor(() =>
      getByText("The current temperature is 87.13°F")
    );
    const trailName = await waitFor(() => getByText("Bear Peak Out and Back"));
    const trailDetailsButton = getAllByRole("button", {
      name: "View Trail Details",
    });
    fireEvent.click(trailDetailsButton[1]);
    //Sidebar and TrailDetails component rendered
    const saveButton = getByRole("button", {
      name: "Save to Favorites",
    });
    fireEvent.click(saveButton);
    const savedTrailsButton = getByRole("button", { name: "My Saved Trails" });
    fireEvent.click(savedTrailsButton);
    //Sidebar and SavedTrails component rendered
    const savedTrailName = getByText("Bear Peak Out and Back");
    const savedTrailDetailsButton1 = getByRole("button", {
      name: "View Trail Details",
    });
    fireEvent.click(savedTrailDetailsButton1);
    //Sidebar and TrailDetails component rendered
    const removeButton = getByRole("button", {
      name: "Remove from Favorites",
    });
    fireEvent.click(removeButton);
    const savedTrailsButton2 = getByRole("button", { name: "My Saved Trails" });
    fireEvent.click(savedTrailsButton2);
    //Sidebar and SavedTrails component rendered
    const sidebarMessage = getByText("Select a different city:");
    const noTrailsSavedMessage = getByText(
      "There are currently no trails saved to favorites."
    );

    expect(sidebarMessage).toBeInTheDocument();
    expect(noTrailsSavedMessage).toBeInTheDocument();
  });
});
