const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Ensure you have this package installed

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock function to simulate fetching weather data
const getWeatherData = async (city) => {
    // Replace with your actual API call logic
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Weather data fetch failed');
    }
    return await response.json();
};

// Route to get weather data
app.get('/api/weather/:city', async (req, res) => {
    const city = req.params.city;
    try {
        const data = await getWeatherData(city);
        res.json({
            city: data.name,
            temperature: data.main.temp,
            weather: data.weather[0].description,
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'City not found or data unavailable.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
