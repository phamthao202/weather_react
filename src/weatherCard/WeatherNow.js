import React from "react";

const WeatherNow = ({ weatherData, currentCityWeather, keyword }) => {
  if (!currentCityWeather) return <div></div>;
  if (!weatherData)
    return (
      <div className="info">
        <div>Weather in </div>
        <div>{currentCityWeather.name}</div>
        <div>{currentCityWeather.main && currentCityWeather.main.temp}°C</div>
        <div>
          Feel like:{" "}
          {currentCityWeather.main && currentCityWeather.main.feels_like}°C
        </div>
        <div>
          Low: {currentCityWeather.main && currentCityWeather.main.temp_min}°C
        </div>
        <div>
          High: {currentCityWeather.main && currentCityWeather.main.temp_max}°C
        </div>
      </div>
    );
  return (
    <div className="info">
      <div >Weather in </div>
      <div style={{backgroundColor:"pink"}}>{keyword.toUpperCase()}</div>
      <div>{weatherData.current && weatherData.current.temp}°C</div>
      <div>
        Feel like: {weatherData.current && weatherData.current.feels_like}°C
      </div>
      <div className="icon">
        {weatherData.current && (
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherNow;
