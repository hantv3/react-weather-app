import React, { useState } from "react";
import axios from "axios";
function App() {
  // Tạo state chưa dữ liệu khi gọi đến api
  const [data, setData] = useState([]);
  // Tạo state set dữ liệu khi search location
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=859b842dcdd2482527c201378c183952&lang=vi`;

  // Tạo hàm xử lý khi nhập dữ liệu vào input sẽ call api lấy data
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log("Data weather: ", response.data);
      });
      setLocation("");
    }
  };
  // Hàm xử lý viết hoa chữ cái đầu
  // const upperCaseFristLetter = (string) => {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // };
  const myStyle = {
    content: "",
    background: `url(${
      process.env.PUBLIC_URL +
      `/assets/img/${
        data.weather ? data.weather[0].icon + ".jpg" : "default.jpg"
      }`
    }) no-repeat center center/cover`,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
  };
  console.log(myStyle);
  return (
    <div style={myStyle} className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="text"
          placeholder="Nhập thành phố"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>{data.main ? data.main.temp.toFixed() + "°C" : null}</h1>
          </div>
          <div className="">
            <p>{data.weather ? data.weather[0].description : null}</p>
          </div>
          <div className="description">
            <p>{data.weather ? data.weather[0].main : null}</p>
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {data.main ? data.main.feels_like.toFixed() + "°C" : null}
              </p>
              <p>Feels like</p>
            </div>
            <div className="humidity">
              <p className="bold">
                {data.main ? data.main.humidity + "%" : null}
              </p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.wind ? data.wind.speed.toFixed() + "MPM" : null}
              </p>
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;