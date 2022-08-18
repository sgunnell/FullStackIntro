import React from 'react';
import CountryDetail from './CountryDetail'
import Country from './Country'
import WeatherData from './WeatherData'

const Countries = ({countries,handleShow}) => {
    if (countries.length>10){
        return(
            <div>
                <span>Too many matches,specify another filter.</span> 
            </div>
        );
    } else if (countries.length>1 && countries.length<=10){
        return( <ul>{countries.map(country=> <Country key ={country.name.common} country={country} handleClick={handleShow}/> )} </ul>)
        
    }else if (countries.length===1){
        console.log("1 country",countries)
        return(
            <div>
                {countries.map(country=>(<CountryDetail key={country.name.common} country={country}/>))}
                
            </div>
            
        )
    }

}

export default Countries;