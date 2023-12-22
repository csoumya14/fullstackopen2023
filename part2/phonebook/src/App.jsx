import { useState } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-123456", id: 1 },
    { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

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
