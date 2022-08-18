import React from 'react';
import WeatherData from './WeatherData';

const CountryDetail = ({country}) => {
    
    return(
    <div>
        <h1> {country.name.common}</h1>
        <div> Capital: {country.capital}</div>
        <div> Population: {country.population}</div>
        <h2> Languages</h2>
        <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
        </ul>
        <img
            src={country.flags.png}
            alt={`Flag of ${country.name}`}
            
        />

        <WeatherData city = {country.capital}/>
    </div>
    )
};


export default CountryDetail;