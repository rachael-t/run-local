export const fetchWeather = (lat, lon) => {
  console.log("lat", lat);
  console.log("lon", lon);
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d1ace92366d9a453c37cee4b46329fe&units=imperial`
  ).then((response) => response.json());
};

export const fetchTrails = (lat, lon) => {
  console.log("lat", lat);
  console.log("lon", lon);
  return fetch(
    `https://www.trailrunproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=5&key=200784597-944ac7b994117cd50260ab05aae14a92`
  ).then((response) => response.json());
};
