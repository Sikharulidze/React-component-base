interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = ({ searchTerm, onChange }: SearchBarProps) => {
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
