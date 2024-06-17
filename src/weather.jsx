// import { useEffect, useState } from 'react'
// //import './Weather.css'

// function Weather() {

    

//     let [city, setCity] = useState({});
//     let [icon, setIcon] = useState("");

//     useEffect(() => {
//         fetch("https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=680008d128dddbfb0ace674df3fcec48", {
//             method: 'GET'
//         })
//             .then((response) => {
//                 return response.json();
//             })
//             .then((data) => {
//                 console.log(data);
//                 setCity(data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }, []);



//     useEffect(() => {
//         if (city.weather && city.weather.length > 0) {
//             // console.log("https://openweathermap.org/img/wn/" + city.weather[0].icon + ".png");
//             setIcon("https://openweathermap.org/img/wn/" + city.weather[0].icon + ".png")

//         }
//     }, [city]);

//     return (
//         <div className='card_container'>
//             <div className='card'>
//                 <div>
//                     {city.main && <h1>{Math.round((city.main.temp) - 273.15) + " °C"}</h1>}
//                     <h1>{city.name}</h1>
//                 </div>
//                 <img src={icon} alt="Weather icon" className='image' />
//                 <div>
//                     {city.main && <h1>{"Humidity: " + (city.main.humidity) + " % "}</h1>}
//                     {city.main && <h1>{"Wind: " + (city.wind.speed) + " m/s "}</h1>}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Weather



import { useEffect, useState } from 'react';
import './weather.css'


function Weather() {
    let [city, setCity] = useState("");
    let [weatherData, setWeatherData] = useState({});
    let [icon, setIcon] = useState("");
    let [inputCity, setInputCity] = useState("Mumbai");

    let fetchWeather = (cityName) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=680008d128dddbfb0ace674df3fcec48`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setWeatherData(data);
                setCity(cityName);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchWeather(inputCity);
    }, [inputCity]);

    useEffect(() => {
        if (weatherData.weather && weatherData.weather.length > 0) {
            setIcon(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`);
        }
    }, [weatherData]);

    let handleSearch = (e) => {
        e.preventDefault();
        fetchWeather(city);
    };

    return (
        <div className='card_container'>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />
                <button type="submit">Search</button>
            </form>
            <div className='card'>
                <div>
                    {weatherData.main && <h1>{Math.round(weatherData.main.temp - 273.15) + " °C"}</h1>}
                    <h1>{weatherData.name}</h1>
                </div>
                <img src={icon} alt="Weather icon" className='image' />
                <div>
                    {weatherData.main && <h1>{"Humidity: " + weatherData.main.humidity + " %"}</h1>}
                    {weatherData.wind && <h1>{"Wind: " + weatherData.wind.speed + " m/s"}</h1>}
                </div>
            </div>
        </div>
    );
}

export default Weather;
