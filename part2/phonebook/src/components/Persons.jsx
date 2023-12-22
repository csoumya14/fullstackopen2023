const Persons = ({ personToShow }) => {
  return (
    <ul>
      {personToShow.map((person) => (
        <li key={person.id}>
          {person.name}: {person.phoneNumber}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
