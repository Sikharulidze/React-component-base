import styled from "styled-components";
interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = ({ searchTerm, onChange }: SearchBarProps) => {
  return (
    <>
      <StyledInput
        type="text"
        value={searchTerm}
        onChange={onChange}
        placeholder="Search by name"
      />
    </>
  );
};

export default SearchBar;

const StyledInput = styled.input`
  font-size: 20px;
  border: 1px solid gray;
  padding: 15px;
  border-radius: 15px;
  width: 50%;
  margin: auto;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #aaa;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;
