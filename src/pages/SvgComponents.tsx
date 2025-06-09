import { useEffect, useMemo, useState } from "react";
import useSvgComponents from "../store/useSvgComponents";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const SvgComponents = () => {
  const { components, fetchSvgComponents } = useSvgComponents();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown((prev) => !prev);
  };

  useEffect(() => {
    fetchSvgComponents();
  }, [fetchSvgComponents]);

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
        <DesktopSearchAndFilter>
          <SearchBarWrapper>
            <SearchBar searchTerm={searchTerm} onChange={searchChangeHandler} />
          </SearchBarWrapper>

          <FilterBoxWrapper>
            <FilterBox
              onClick={toggleFilterDropdown}
              role="button"
              tabIndex={0}
            >
              Filter
            </FilterBox>

            {showFilterDropdown && (
              <FilterDropdown>
                <FilterTitle>Choose by category</FilterTitle>
                <FilterRowsContainer>
                  <FilterRow>
                    <FilterItem type="button">Interface & UI</FilterItem>
                    <FilterItem type="button">Web & Communication</FilterItem>
                  </FilterRow>
                  <FilterRow>
                    <FilterItem type="button">People & Society</FilterItem>
                    <FilterItem type="button">Education & Science</FilterItem>
                  </FilterRow>
                  <FilterRow>
                    <FilterItem type="button">Health & Safety</FilterItem>
                    <FilterItem type="button">Business & Work</FilterItem>
                  </FilterRow>
                  <FilterRow>
                    <FilterItem type="button">Industry & Technology</FilterItem>
                    <FilterItem type="button">Travel & Transport</FilterItem>
                  </FilterRow>
                  <FilterRow>
                    <FilterItem type="button">Culture & Lifestyle</FilterItem>
                    <FilterItem type="button">
                      Nature & Entertainment
                    </FilterItem>
                  </FilterRow>
                </FilterRowsContainer>
              </FilterDropdown>
            )}
          </FilterBoxWrapper>
        </DesktopSearchAndFilter>

        <MobileActionsWrapper>
          <MobileSearchButton aria-label="Search">
            <svg
              viewBox="0 0 24 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm12.707 19.293-6.242-6.244"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MobileSearchButton>

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
        </MobileActionsWrapper>
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

// Styled Components

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
  cursor: pointer;
`;

const ImageElement = styled.img`
  width: 100%;
`;

const FilterWrapper = styled.div`
  width: 100%;
  max-width: 1270px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 120px;
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

const DesktopSearchAndFilter = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    display: none;
  }

  & > *:not(:first-child) {
    margin-left: 177px;
  }
`;

const SearchBarWrapper = styled.div`
  width: 670px;
`;

const FilterBoxWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

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
  cursor: pointer;
  width: 108px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
  }
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 80px;
  right: 0;
  width: 607px;
  height: 449px;
  background-color: #29253e;
  padding: 20px;
  border-radius: 15px;
  color: white;
  z-index: 1000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;

const FilterTitle = styled.h3`
  margin-bottom: 24px;
  font-size: 20px;
  text-align: center;
`;

const FilterRowsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const FilterItem = styled.button`
  width: 48%;
  background-color: #3a3570;
  padding: 12px 16px;
  border-radius: 10px;
  border: none;
  text-align: center;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  color: white;
  font-family: inherit;
  transition: background 0.3s ease;

  &:hover,
  &:focus {
    outline: none;
    background: linear-gradient(135deg, #2973ff 0%, #932eff 100%);
  }
`;

const MobileActionsWrapper = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1270px;
    padding: 0 5px;
    margin-top: 16px;
  }
`;

const MobileSearchButton = styled.button`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    width: 56px;
    height: 56px;
    background: linear-gradient(96.24deg, #2973ff 5.86%, #932eff 77.64%);
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
  display: none;

  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    width: 56px;
    height: 56px;
    background: linear-gradient(96.24deg, #2973ff 5.86%, #932eff 77.64%);
    border-radius: 14px;
    border: none;
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;
