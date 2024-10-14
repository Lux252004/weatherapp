import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    setError(null); // Reset error state before fetching data
    try {
      // Ensure you specify the full URL including port
      const response = await fetch(`http://localhost:5000/api/weather/${city}`);
      
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data); // Set weather data if response is successful
      } else if (response.status === 404) {
        const errorData = await response.json();
        setError(errorData.error);
        setWeatherData(null); // Clear weather data on error
      } else {
        setError('An unexpected error occurred.');
      }
    } catch (err) {
      setError('An error occurred while fetching the weather data.');
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a valid city name.');
      return;
    }
    getWeather();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {/* Display weather data */}
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.city}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Condition: {weatherData.weather}</p>
        </div>
      )}

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
