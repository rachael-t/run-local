export const fetchWeather = async (lat, lon) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d1ace92366d9a453c37cee4b46329fe&units=imperial`);
    return await response.json();
  }
  catch (err) {
    return alert(`We sincerely apologize. We encountered an error of: ${err}`);
  }
};

export const fetchTrails = async (lat, lon) => {
  try {
    const response = await fetch(`https://www.trailrunproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=5&key=200784597-944ac7b994117cd50260ab05aae14a92`);
    return await response.json();
  }
  catch (err) {
    return alert(`We sincerely apologize. We encountered an error of: ${err}`);
  }
};
