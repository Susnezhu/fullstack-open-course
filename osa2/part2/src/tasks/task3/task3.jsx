import { useState, useEffect } from "react"
import axios from "axios"

const Task3 = () => {
    const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState("")

    const hook = () => {
        axios.
        get(baseUrl)
        .then(response => {
            const countriesData = response.data
            const countryObject = countriesData.map(country => ({
                name: country.name.common,
                capital: country.capital,
                languages: country.languages ? Object.values(country.languages) : [],
                area: country.area,
                flag: country.flags.png,
                alt: country.flags.alt
            }))

            setCountries(countryObject)
        })
    }
    useEffect(hook, [])
    

    const handleInputChange = (event) => {
        setNewFilter(event.target.value)
    }

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(newFilter.toLowerCase())
    )


    return (
        <div>
            <h1>Search countries</h1>

            <div>
                find countries <input value={newFilter} onChange={handleInputChange} />
            </div>

            <CountryList countries={filteredCountries} />
        </div>
    )
}

const CountryList = ({countries}) => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    if (countries.length > 10) {
        return <p>Too many matches, specife another filter</p>
    } else if (countries.length === 1) {
        return <CountryDetail country={countries[0]} />
    } else {
        return (
            <div>
                <ul>
                    {countries.map(country => (
                        <li key={country.name}>
                            {country.name} <button onClick={() => setSelectedCountry(country)}>Show</button>
                        </li>
                    ))}
                </ul>
                {selectedCountry && <CountryDetail country={selectedCountry} />}
            </div>
        )
    }
}

const CountryDetail = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>

            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <p>Languages:</p>
            <ul>
                {country.languages.map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>

            <img src={country.flag} alt={country.alt} width={150} />
        </div>
    )
}

export default Task3