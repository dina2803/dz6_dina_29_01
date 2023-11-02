import React, { useState, useEffect } from 'react'

const WeatherApp = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const apiKey = '5a56d105cb0c6e7f4e9d5546aa814224'

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )

      if (response.ok) {
        const data = await response.json()
        setWeatherData(data)
      } else {
        console.error('Error fetching weather data:', response.status)
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  useEffect(() => {
    if (city) {
      fetchWeatherData()
    }
  }, [city])

  return (
      <div className="weather-app">
        <h1>Погода в разных точках мира</h1>
        <div>
          <input
              type="text"
              placeholder="Введите название города"
              value={city}
              onChange={(e) => setCity(e.target.value)}
          />
        </div>
        {weatherData && (
            <div className="weather-data">
              <h2>{weatherData.name}</h2>
              <p>Температура: {weatherData.main.temp}°C</p>
              <p>Влажность: {weatherData.main.humidity}%</p>
              <p>Описание: {weatherData.weather[0].description}</p>
            </div>
        )}
      </div>
  )
}

export default WeatherApp;
