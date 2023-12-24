import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "notes");

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      phoneNumber: newNumber ? newNumber : "",
      id: persons.length + 1,
    };
    const isNameAdded = persons.find(
      (person) => person.name.toLowerCase() === personObject.name.toLowerCase()
    );
    if (isNameAdded) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setSearchName(event.target.value);
  };

  const filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const personToShow = filteredList.length !== 0 ? filteredList : persons;
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonsForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} />
    </div>
  );
};

export default App;
