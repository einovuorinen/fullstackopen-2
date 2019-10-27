import React, {useState, useEffect} from 'react';
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [view, setView] = useState('')

  const hook = () => {
  console.log('effect')
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  const searchCountries = (event) => {
    setSearch(event.target.value)
  }

  const clickToShowOne = ({id}) => {
    console.log(id)
  }

  const Results = () => {
    const display = countries.filter(result => result.name.toLowerCase().includes(search.toLowerCase()))
    
    const Single = ({c}) => {
      const [weather, setWeather] = useState()
      useEffect( () => {
        axios.get(`https://samples.openweathermap.org/data/2.5/weather?q=${c.capital}&appid=b6907d289e10d714a6e88b30761fae22`)
        .then(response => {
          setWeather(response.data)
        })
      }, [])
      return (
        <div>
          <h1>{c.name}</h1>
          <p>capital {c.capital}</p>
          <p>population {c.population}</p>
          <h1>languages</h1>
          <ul>
            {c.languages.map(x => <li key={x.name}>{x.name}</li>)}
          </ul>
          <img src={c.flag} width="200"/>
        </div>
      )
    }

    if (display.length > 10) return 'Too many matches, specify another filter'
    if (display.length === 1) {
      console.log(display)
      const c = display[0]
      console.log(c.languages)
      return (
        <Single c={c}/>
      )
    }
    else return display.map(x=> <p key={x.name}>{x.name} <button onClick={() => clickToShowOne(x.name)}>show</button></p>)
  }

  return (
    <div>
      search countries<input 
        value={search}
        onChange={searchCountries}
      />
      <div>
        <Results/>
      </div>
    </div>
  )
}

export default App