import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import WeatherNow from "./weatherCard/WeatherNow";
import WeatherForecast from "./weatherCard/weatherForecast";
import w3 from "./images/w3.jpg";
import w1 from "./images/w1.jpg";
import w4 from "./images/w4.jpg";
function App() {
  const [keyword, setKeyword] = useState(" ");
  const [weatherData, setWeatherData] = useState(null);
  const [currentCityWeather, setCurrentCityWeather] = useState("");
  const getWeatherData = async (e) => {
    if (e) e.preventDefault();
    try {
      console.log("keyword", keyword);
      let url = `${process.env.REACT_APP_SERVER}/city?q=${keyword}`;
      let response = await fetch(url);
      if (response.status == 200) {
        let data = await response.json();
        // console.log("do we get data", response);
        setWeatherData(data.data);
        console.log(`data cua ${keyword}`, data.data);
      } else throw new Error({ message: "ngu qua" });
    } catch (err) {
      console.log("getWeatherData sai roi ne", err.message);
    }
  };

  const getLocation = () => {
    console.log("o tren");
    navigator.geolocation.getCurrentPosition((post) => {
      console.log("dang o day", post.coords);
      getWeatherByCurrentLocation(post.coords.latitude, post.coords.longitude);
    });
  };

  const getWeatherByCurrentLocation = async (latitude, longitude) => {
    const url = `${process.env.REACT_APP_SERVER}/coord?long=${longitude}&lat=${latitude}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("current", data);
    setCurrentCityWeather(data.data);
  };

  useEffect(() => {
    getWeatherData();
    getLocation();
    getWeatherByCurrentLocation();
  }, []);
  return (
    <div
      className={
        weatherData && weatherData.current.weather[0].main === "Clear"
          ? "backgroundImg"
          : "backgroundRain"
      }
    >
      <div className="headerArea">
        <img src={w3} className="headerImg" />
      </div>

      <div className="inputCityArea">
        <Form
          className="button1"
          inline
          onSubmit={(event) => getWeatherData(event)}
        >
          <FormControl
            type="text"
            placeholder="CiTie   ?   ^_^"
            className="mr-sm-2"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </div>

      <div>
        <div style={{ position: "relative" }}>
          <div className="body-left-img">
            <img className="body-img" src={w1} />
            <div className="showWeatherBody">
              <WeatherNow
                weatherData={weatherData}
                currentCityWeather={currentCityWeather}
                keyword={keyword}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <WeatherForecast
          className="text-on-pic"
          weatherData={weatherData}
          currentCityWeather={currentCityWeather}
        />
      </div>
    </div>
  );
}

export default App;
