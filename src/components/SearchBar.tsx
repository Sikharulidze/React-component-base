import styled from "styled-components";

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchTerm, onChange }: SearchBarProps) => {
  return (
    <SearchBarWrapper>
      <StyledInput
        type="text"
        value={searchTerm}
        onChange={onChange}
        placeholder="Search by name"
      />
      <SearchIcon>
        <svg
          viewBox="0 0 40 42"
          fill="none"
          width="32"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
        >
          <defs>
            <linearGradient id="searchGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2973ff" />
              <stop offset="100%" stopColor="#932eff" />
            </linearGradient>
          </defs>

          <circle
            cx="15"
            cy="7"
            r="15"
            stroke="url(#searchGradient)"
            strokeWidth="2"
          />

          <line
            x1="28"
            y1="20"
            x2="48"
            y2="42"
            stroke="url(#searchGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </SearchIcon>
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 50%;
  margin: 80px auto 0;
`;

const StyledInput = styled.input`
  font-size: 20px;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;

  border: 3px solid transparent;
  border-radius: 15px;

  background-image: linear-gradient(#18122a, #18122a),
    linear-gradient(135deg, #932eff, #2973ff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-color: transparent;

  &::placeholder {
    font-size: 18px;
    color: #bbb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(147, 46, 255, 0.5);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  right: -3px;
  bottom: -5px;
  transform: rotate(7.48deg);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;
