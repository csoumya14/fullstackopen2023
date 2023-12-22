const Filter = ({ searchName, handleFilter }) => {
  return (
    <div>
      filter shown with: <input value={searchName} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
