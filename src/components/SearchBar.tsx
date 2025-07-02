import styled from "styled-components";

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBarWithFilter = ({ searchTerm, onChange }: SearchBarProps) => {
  return (
    <RightAlignedWrapper>
      <SearchFilterWrapper>
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
      </SearchFilterWrapper>
    </RightAlignedWrapper>
  );
};

export default SearchBarWithFilter;

const RightAlignedWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const SearchFilterWrapper = styled.div`
  width: 955px;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 767px) {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    height: auto;
  }
`;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 670px;
`;

const StyledInput = styled.input`
  font-size: 20px;
  padding: 15px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  border: 3px solid transparent;
  border-radius: 15px;

  background-image: linear-gradient(#18122a, #18122a),
    linear-gradient(135deg, #2973ff, #932eff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-color: transparent;
  color: white;

  &::placeholder {
    font-size: 18px;
    color: #bbb;
  }

  

  @media (max-width: 767px) {
    font-size: 16px;
    padding: 10px;
    height: 50px;
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
