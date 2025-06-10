import { useEffect, useMemo, useState } from "react";
import useSvgComponents from "../store/useSvgComponents";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const SvgComponents = () => {
  const { components, fetchSvgComponents } = useSvgComponents();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => setIsOpen(!isOpen);

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
            <FilterBox onClick={handleClick} role="button" tabIndex={0}>
              Filter
            </FilterBox>

            {isOpen && (
              <FilterDropdown>
                <FilterRowsContainer>
                  <FilterTitle>
                    Choose by <span>Category</span>
                  </FilterTitle>
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
  position: fixed;
  top: 0;
  right: 0;
  width: 707px;
  height: 100vh;
  background-color: #29253e;
  padding: 20px;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  animation: slideIn 0.3s ease forwards;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const FilterTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 40px;
  text-align: center;

  span {
    color: #932eff;
  }
`;

const FilterRowsContainer = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const FilterItem = styled.button`
  position: relative;
  padding: 0 30px;
  white-space: nowrap;
  width: fit-content;
  height: 60px;
  border-radius: 10px;
  background: linear-gradient(135deg, #2973ff 0%, #932eff 100%);
  color: white;
  cursor: pointer;
  user-select: none;
  text-align: center;
  border: none;
  z-index: 0;
  font-size: 20px;
  
  

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background-color: #29253e;
    border-radius: 8px;
    z-index: -1;
  }

  &:hover::before {
    background-color: #1f1c33;
  }

  &:focus {
    outline: none;
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
