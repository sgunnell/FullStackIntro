import { useState, useEffect } from 'react'
import axios from 'axios'
import InputField from './components/InputField'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')



  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('prefilter log')
        if(filter!==""){
          console.log('promise fulfilled')
          console.log(response.data.length, "data points acquired")
          const filterResult = response.data.filter((country) =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          );
          console.log('countries length',filterResult.length)
          setCountries(filterResult)
        }
      })
  }, [filter])
  
  



  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleFilterClick = (countryName) => {
    setFilter(countryName)
  }

  return(
    <div>
      <InputField 
          label="find countries:"
          type="text"
          value= {filter}
          onChange= {handleFilterChange}
          reset = {handleFilterClick}
          />
      <Countries countries ={countries} handleShow ={handleFilterClick}></Countries>

    </div>
  )
}

export default App;