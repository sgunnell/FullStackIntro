import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherData = ({city}) => {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    const api_key = process.env.REACT_APP_API_KEY
    const [weatherData,setWeatherData] = useState([]);



    useEffect(() => {
        console.log('weather effect')
        axios
            .get(`${baseUrl}${city}&appid=${api_key}&units=metric`)
            .then(response=> {
                console.log('promise fulfilled')
                setWeatherData(response.data)
            });
      }, [])
   
    return ( 
        <>
            {weatherData.main ?(
            <div>
                <h2> Weather data for {city} </h2>
                <div> Temperature {weatherData.main.temp}</div>
                <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={`Weather Icon in ${city}`}
                
                />
                <div> Wind {weatherData.wind.speed}</div>


                
            </div>
            ) : null }
        </>
    )

}

export  default WeatherData;