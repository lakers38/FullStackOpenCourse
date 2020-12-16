import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'
function App() {

  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  console.log()

  return (
    <div className="App">
      <div>find countries <input onChange = {handleFilterChange}></input></div>
      <Countries countries={countries} newFilter ={newFilter}></Countries>
    </div>
  );
}

export default App;
