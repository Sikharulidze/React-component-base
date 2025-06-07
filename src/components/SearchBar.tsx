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
  padding: 15px;
  width: 50%;
  margin: 80px auto 0;
  box-sizing: border-box;

  border: 3px solid transparent;
  border-radius: 15px;

  background-image: linear-gradient(#18122a, #18122a),
    linear-gradient(135deg, #932eff, #2973ff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-color: transparent;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(147, 46, 255, 0.5);
  }
`;
