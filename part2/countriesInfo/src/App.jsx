import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Countries from "./components/Countries";
import DisplayCountryInfo from "./components/DisplayCountryInfo";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    console.log("effect");
    countryService.getAll().then((initialCountries) => {
      console.log("promise fulfilled");
      setCountries(initialCountries);
    });
  }, []);

  console.log(countries.length);

  const handleFilter = (event) => {
    setSearchName(event.target.value);
  };

  const filteredList = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      find countries: <input value={searchName} onChange={handleFilter} />
      {filteredList.length >= 11 && (
        <p>Too many matches, specify another filter</p>
      )}
      {filteredList.length < 11 && (
        <ul>
          {filteredList.map((country) => (
            <Countries key={country.name.common} country={country} />
          ))}
        </ul>
      )}
      {filteredList.length === 1 && (
        <div>
          {filteredList.map((country) => (
            <DisplayCountryInfo key={country.name.common} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
