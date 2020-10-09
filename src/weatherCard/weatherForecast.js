import React from "react";
import w4 from "../images/w4.jpg";
import moment from "moment";

const WeatherForecast = ({ weatherData, currentCityWeather }) => {
  if (!currentCityWeather) return <div></div>;
  if (!weatherData) return <div className="info"></div>;
  return (
    <div className="forecastArea">
      {weatherData.daily.map((item) => (
        <div className="cuc-boc">
          <img src={w4} className="weatherDetail1" />
          <div className="daily-text">
            <div style={{ backgroundColor: "pink" }}>
              {moment.unix(item.dt).format("DD - MM - YYYY")}
            </div>
            <div> Day-temp</div>
            <div>{item.temp.day}°C</div>
            <img
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
