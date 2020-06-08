import React from "react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { fetchWeather, fetchTrails } from "../../apiCalls";
jest.mock("../../apiCalls.js");

// Mocked data for fetchWeather & fetchTrails
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

//Unit test for App
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
});

//First user flow integration test
describe("User flow of adding and removing a trail from favorites", () => {
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

// Mocked data for second fetchWeather & fetchTrails calls
let cityWeather2 = {
  coord: {
    lon: -105.09,
    lat: 39.99,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  main: {
    temp: 69.3,
    feels_like: 62.24,
    temp_min: 66,
    temp_max: 73,
    pressure: 1012,
    humidity: 28,
  },
  name: "Lafayette",
};

let cityTrails2 = {
  trails: [
    {
      id: 7041440,
      name: "Dirty Bismark",
      summary:
        "A rare, long, flat-ish loop on dirt in the Front Range, named after the Morgul Bismarck road cycling route.",
      difficulty: "greenBlue",
      location: "Superior, Colorado",
      url: "https://www.trailrunproject.com/trail/7041440/dirty-bismark",
      imgSmall:
        "https://cdn2.apstatic.com/photos/hike/7037550_small_1555086265.jpg",
      imgSmallMed:
        "https://cdn2.apstatic.com/photos/hike/7037550_smallMed_1555086265.jpg",
      imgMedium:
        "https://cdn2.apstatic.com/photos/hike/7037550_medium_1555086265.jpg",
      length: 15.7,
      conditionStatus: "All Clear",
      conditionDetails: "Dry",
      conditionDate: "2020-05-17 12:11:44",
    },
    {
      id: 7009680,
      name: "Coyote Run - Harper Lake - Davidson Mesa - Louisville Res",
      summary:
        "Run an easy climb through Coyote Open Space to Harper Lake, with views of mountains at Davidson Mesa",
      difficulty: "green",
      location: "Louisville, Colorado",
      url:
        "https://www.trailrunproject.com/trail/7009680/coyote-run-harper-lake-davidson-mesa-louisville-res",
      imgSmall:
        "https://cdn2.apstatic.com/photos/hike/7046019_small_1555533780.jpg",
      imgSmallMed:
        "https://cdn2.apstatic.com/photos/hike/7046019_smallMed_1555533780.jpg",
      imgMedium:
        "https://cdn2.apstatic.com/photos/hike/7046019_medium_1555533780.jpg",
      length: 8.3,
      conditionStatus: "All Clear",
      conditionDetails: "",
      conditionDate: "2020-05-17 11:57:53",
    },
  ],
};

//Second user flow integration test
describe("User flow of switching the selected city", () => {
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

  it("should load the new selected city`s weather and trails when Find New Trails has been clicked", async () => {
    fetchWeather
      .mockResolvedValueOnce(cityWeather)
      .mockResolvedValueOnce(cityWeather2);
    fetchTrails
      .mockResolvedValueOnce(cityTrails)
      .mockResolvedValueOnce(cityTrails2);

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
    const cityName = await waitFor(() => getAllByText("Arvada"));
    const weatherMessage = await waitFor(() =>
      getByText("The current temperature is 87.13°F")
    );
    const trailName = await waitFor(() =>
      getByText("Sunshine Lion's Lair Loop")
    );
    const sidebarCitySelection = getByPlaceholderText("select a city");
    const newTrailsButton = getByRole("button", { name: "Find New Trails" });
    fireEvent.change(sidebarCitySelection, {
      target: { value: "Lafayette" },
    });
    fireEvent.click(newTrailsButton);

    //Sidebar, LocationContainer and TrailCard components rendered

    const newCityName = await waitFor(() => getAllByText("Lafayette"));
    const weatherMessage2 = await waitFor(() =>
      getByText("The current temperature is 69.3°F")
    );
    const trailName2 = await waitFor(() =>
      getByText("Coyote Run - Harper Lake - Davidson Mesa - Louisville Res")
    );

    expect(newCityName[1]).toBeInTheDocument();
    expect(weatherMessage2).toBeInTheDocument();
    expect(trailName2).toBeInTheDocument();
  });
});

//Third user flow integration test
describe("User flow of adding trails from different cities to their saved trails", () => {
  it("should display the a saved trail card when the My Saved Trails button is clicked", async () => {
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

  it("should display multiple saved trail cards from different cities when the My Saved Trails button is clicked", async () => {
    fetchWeather
      .mockResolvedValueOnce(cityWeather)
      .mockResolvedValueOnce(cityWeather2);
    fetchTrails
      .mockResolvedValueOnce(cityTrails)
      .mockResolvedValueOnce(cityTrails2);
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
    const savedTrailDetailsButton = getByRole("button", {
      name: "View Trail Details",
    });
    const sidebarCitySelection = getByPlaceholderText("select a city");
    const newTrailsButton = getByRole("button", { name: "Find New Trails" });
    fireEvent.change(sidebarCitySelection, {
      target: { value: "Lafayette" },
    });
    fireEvent.click(newTrailsButton);

    //Sidebar, LocationContainer and TrailCard components rendered
    const newCityName = await waitFor(() => getAllByText("Lafayette"));
    const weatherMessage2 = await waitFor(() =>
      getByText("The current temperature is 69.3°F")
    );
    const trailName2 = await waitFor(() =>
      getByText("Coyote Run - Harper Lake - Davidson Mesa - Louisville Res")
    );
    const newTrailDetailsButton = getAllByRole("button", {
      name: "View Trail Details",
    });
    fireEvent.click(newTrailDetailsButton[1]);
    //Sidebar and TrailDetails component rendered
    const newSaveButton = getByRole("button", {
      name: "Save to Favorites",
    });
    fireEvent.click(newSaveButton);
    const newSavedTrailsButton = getByRole("button", {
      name: "My Saved Trails",
    });
    fireEvent.click(newSavedTrailsButton);

    //Sidebar and SavedTrails component rendered
    const savedTrailsViewDetailsButton = getAllByRole("button", {
      name: "View Trail Details",
    });

    expect(savedTrailsViewDetailsButton).toHaveLength(2);
  });
});
