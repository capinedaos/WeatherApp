import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/ContainerStyle.css";

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isCentigrade, setIsCentigrade] = useState(true);

  useEffect(() => {
    axios
      .get(
        `  https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0ae510493d599a7e66a50d9a764f242a`
      )
      .then((res) => {
        setWeather(res.data);
      });
  }, [latitude, longitude]);

  console.log(weather);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
    // console.log("Your current position is:");
    // console.log("Latitude : " + crd.latitude);
    // console.log("Longitude: " + crd.longitude);
    // console.log("More or less " + crd.accuracy + " meters.");
  }

  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  const changeUnit = () => setIsCentigrade(!isCentigrade);

  return (
    <div className="container">
      <div className="cardWeather">
        <div className="title">
          <h1>
            Weather <br /> App
          </h1>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
            alt=""
            className="imagen"
          />
        <button onClick={changeUnit}>Change temperature</button>

        </div>

        <div>
          <h2>location</h2>
          <p>name: {weather.weather?.[0].main}</p>
          <p>description: {weather.weather?.[0].description}</p>
          <p>country: {weather.sys?.country}</p>
          <p>city: {weather.name}</p>
          <p>
            temperature:
            {isCentigrade
              ? ` ${Math.trunc(weather.main?.temp - 273.15)} °C`
              : ` ${Math.trunc(
                  ((weather.main?.temp - 273.15) * 9) / 5 + 32
                )} °F`}
          </p>
          <p>latitude: {latitude}</p>
          <p>longitude: {longitude}</p>
          <p>humidity: {weather.main?.humidity}</p>

          <h2>wind</h2>
          <p>deg: {weather.wind?.deg}</p>
          <p>gust: {weather.wind?.gust}</p>
          <p>speed: {weather.wind?.speed}</p>
        </div>

      </div>
    </div>
  );
};

export default Weather;
