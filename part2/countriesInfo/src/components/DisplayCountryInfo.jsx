const DisplayCountryInfo = ({ country }) => {
  const languageShortForm = Object.keys(country.languages);
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>area : {country.area}</p>
      <p>languages:</p>
      <ul>
        {languageShortForm.map((languageShort) => (
          <li key={languageShort}>{country.languages[languageShort]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" height="100" width="100" />
    </>
  );
};

export default DisplayCountryInfo;
