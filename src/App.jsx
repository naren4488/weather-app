import { useState } from "react";
import axios from "axios";
import "./App.css";
import WeatherCard from "./WeatherCard";

function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  // console.log(weatherData);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (input) {
      setLoading(true);
      axios
        .get(`https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: "b963fed546bf4dabad373632231409",
            q: input
          }
        })
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          alert("Failed to fetch weather data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="input-wrapper">
          <input
            placeholder="Enter city name"
            type="text"
            value={input}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>

        {loading && <p>Loading data...</p>}
        {!loading && weatherData && (
          <div className="cards-wrapper">
            <WeatherCard
              title="Temperature"
              value={`${weatherData.current.temp_c}°C`}
            />
            <WeatherCard
              title="Humidity"
              value={`${weatherData.current.humidity}%`}
            />
            <WeatherCard
              title="Condition"
              value={`${weatherData.current.condition.text}`}
            />
            <WeatherCard
              title="Wind Speed"
              value={`${weatherData.current.wind_kph} kph`}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
