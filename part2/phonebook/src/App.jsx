import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const isNameAdded = persons.find(
      (person) => person.name.toLowerCase() === personObject.name.toLowerCase()
    );
    if (isNameAdded) {
      if (isNameAdded.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
        setNewName("");
        setNewNumber("");
      } else {
        if (
          window.confirm(
            `${newName} is already added to phonebook. Do you want to replace the phone number?`
          )
        ) {
          personService
            .update(isNameAdded.id, personObject)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== isNameAdded.id ? person : returnedPerson
                )
              );
              setMessage(`Number of ${newName} is changed`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
              setNewName("");
              setNewNumber("");
            })
            .catch(() => {
              setMessage(
                `Information of ${newName} is already removed from the server`
              );
              setTimeout(() => {
                setMessage(null);
              }, 5000);
              setPersons(
                persons.filter((person) => person.id !== isNameAdded.id)
              );
            });
        }
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
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
      <Notification message={message} />
      <Filter searchName={searchName} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonsForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {personToShow.map((person) => (
          <Persons
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
