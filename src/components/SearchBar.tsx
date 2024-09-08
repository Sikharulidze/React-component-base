const SearchBar = ({ searchTerm, onChange }) => {
  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={onChange}
        placeholder="Search by name"
      />
    </>
  );
};

export default SearchBar;
