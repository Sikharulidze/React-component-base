import { useEffect, useMemo, useState } from "react";
import useSvgComponents from "../store/useSvgComponents";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
const SvgComponents = () => {
  const { components, fetchSvgComponents } = useSvgComponents();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchSvgComponents();
  }, []);
  const handleSvgClick = (id: string) => {
    navigate(`/svg/${id}`);
  };

  const escapedSearchTerm = useMemo(() => {
    return searchTerm
      .trim()
      .toLowerCase()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }, [searchTerm]);

  const filteredComponents = useMemo(() => {
    return components.filter((component) =>
      component.name.toLowerCase().includes(escapedSearchTerm)
    );
  }, [components, escapedSearchTerm]);

  return (
    <Main>
      <FilterWrapper>
        <SearchBarWrapper>
        <SearchBar searchTerm={searchTerm} onChange={searchChangeHandler} />
        </SearchBarWrapper>
        <MobileSearchButton aria-label="Search">
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm7.707 13.293-2.828-2.829"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</MobileSearchButton>
        <FilterBox>Filter</FilterBox>
        <MobileFilterButton aria-label="Filter">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M7 12H17M10 18H14"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </MobileFilterButton>
      </FilterWrapper>
      {searchTerm.length > 0 && (
        <DisplayBox>
          {filteredComponents.length > 0 ? (
            filteredComponents.map((component) => (
              <ImageBox
                key={component.id}
                onClick={() => handleSvgClick(component.id)}
              >
                <ImageElement
                  src={import.meta.env.VITE_API_URL + component.image}
                />
              </ImageBox>
            ))
          ) : (
            <p>No matching results</p>
          )}
        </DisplayBox>
      )}
    </Main>
  );
};

export default SvgComponents;

const Main = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #18122a;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DisplayBox = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid gray;
  padding: 15px;
  border-radius: 15px;
`;

const ImageElement = styled.img`
  width: 100%;
`;

const FilterWrapper = styled.div`
  width: 100%;
  max-width: 1270px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding: 0 16px;
  }
`;
const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  
  

  @media (max-width: 767px) {
    display: none;
  }
`;


const FilterBox = styled.div`
  background: linear-gradient(135deg, #2973ff 0%, #932eff 100%);
  color: #ffffff;
  font-size: 18px;
  border-radius: 15px;
  user-select: none;
  cursor: default;
  width: 108px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileSearchButton = styled.button`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 2px;
    margin: 0 auto;
    width: 56px;
    height: 56px;
    background: linear-gradient(96.24deg, #2973FF 5.86%, #932EFF 77.64%);
    border-radius: 14px;
    border: none;
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;



const MobileFilterButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 2px;

  margin: 0 auto;
  width: 56px;
  height: 56px;

  background: linear-gradient(96.24deg, #2973ff 5.86%, #932eff 77.64%);
  border-radius: 14px;

  flex: none;
  order: 1;
  flex-grow: 0;

  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
