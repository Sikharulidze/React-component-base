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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    if (!components || components.length === 0) return [];

    return components.filter((component) => {
      const matchesSearch = component.name
        .toLowerCase()
        .includes(escapedSearchTerm);
      const matchesCategory = selectedCategory
        ? component.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [components, escapedSearchTerm, selectedCategory]);

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  console.log("Filtered components:", filteredComponents);
  console.log("Base API URL:", import.meta.env.VITE_API_URL);

  return (
    <Main>
      <MobileActionsWrapper>
        <MobileSearchButton onClick={() => setIsMobileSearchOpen(true)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </MobileSearchButton>

        <MobileFilterButton onClick={() => setIsFilterOpen(true)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
          </svg>
        </MobileFilterButton>
      </MobileActionsWrapper>
      {isMobileSearchOpen && (
        <MobileSearchDropdown>
          <MobileCloseButton onClick={() => setIsMobileSearchOpen(false)}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </MobileCloseButton>

          <MobileSearchTitle>
            <span className="highlight">Uncover</span>
            <span>Something</span>
            <span className="highlight">Exciting!</span>
          </MobileSearchTitle>

          <SearchBarWrapper>
            <SearchBar searchTerm={searchTerm} onChange={searchChangeHandler} />
          </SearchBarWrapper>
        </MobileSearchDropdown>
      )}
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
                <CloseButton
                  aria-label="Close filter dropdown"
                  onClick={() => setIsOpen(false)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setIsOpen(false);
                    }
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 13.7034L6.03802 19.6654C5.81496 19.8885 5.53105 20 5.18631 20C4.84157 20 4.55767 19.8885 4.3346 19.6654C4.11153 19.4423 4 19.1584 4 18.8137C4 18.4689 4.11153 18.185 4.3346 17.962L10.2966 12L4.3346 6.03802C4.11153 5.81496 4 5.53105 4 5.18631C4 4.84157 4.11153 4.55767 4.3346 4.3346C4.55767 4.11153 4.84157 4 5.18631 4C5.53105 4 5.81496 4.11153 6.03802 4.3346L12 10.2966L17.962 4.3346C18.185 4.11153 18.4689 4 18.8137 4C19.1584 4 19.4423 4.11153 19.6654 4.3346C19.8885 4.55767 20 4.84157 20 5.18631C20 5.53105 19.8885 5.81496 19.6654 6.03802L13.7034 12L19.6654 17.962C19.8885 18.185 20 18.4689 20 18.8137C20 19.1584 19.8885 19.4423 19.6654 19.6654C19.4423 19.8885 19.1584 20 18.8137 20C18.4689 20 18.185 19.8885 17.962 19.6654L12 13.7034Z"
                      fill="white"
                    />
                  </svg>
                </CloseButton>
                <FilterRowsContainer>
                  <FilterTitle>
                    Choose by <span>Category</span>
                  </FilterTitle>
                  <FilterRow>
                    <FilterItem type="button">
                      <FilterItemSvg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                          fill="white"
                        />
                      </FilterItemSvg>
                      Interface & UI
                    </FilterItem>
                    <FilterItem type="button">
                      <FilterItemSvg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                          fill="white"
                        />
                      </FilterItemSvg>
                      Web & Communication
                    </FilterItem>
                  </FilterRow>
                  <FilterRow>
                    <FilterItem type="button">
                      <FilterItemSvg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                          fill="white"
                        />
                      </FilterItemSvg>
                      People & Society
                    </FilterItem>
                    <FilterItem type="button">
                      <FilterItemSvg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                          fill="white"
                        />
                      </FilterItemSvg>
                      Education & Science
                    </FilterItem>
                  </FilterRow>
                  <FilterRow>
                    <FilterItem type="button">
                      <FilterItemSvg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                          fill="white"
                        />
                      </FilterItemSvg>
                      Health & Safety
                    </FilterItem>
                    <FilterItem type="button">
                      <FilterItemSvg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                          fill="white"
                        />
                      </FilterItemSvg>
                      Business & Work
                    </FilterItem>
                  </FilterRow>
                  <FilterRow>
                    <FilterItem type="button">
                      <FilterItemSvg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                          fill="white"
                        />
                      </FilterItemSvg>
                      Industry & Technology
                    </FilterItem>
                    <FilterItem type="button">
                      <FilterItemSvg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                          fill="white"
                        />
                      </FilterItemSvg>
                      Travel & Transport
                    </FilterItem>
                  </FilterRow>
                  <FilterRow>
                    <FilterItem type="button">
                      <FilterItemSvg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                          fill="white"
                        />
                      </FilterItemSvg>
                      Culture & Lifestyle
                    </FilterItem>
                    <FilterItem type="button">
                      <FilterItemSvg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                          fill="white"
                        />
                      </FilterItemSvg>
                      Nature & Entertainment
                    </FilterItem>
                  </FilterRow>
                </FilterRowsContainer>
              </FilterDropdown>
            )}
          </FilterBoxWrapper>
        </DesktopSearchAndFilter>
      </FilterWrapper>

      {filteredComponents.length > 0 ? (
        <IconsGrid>
          {filteredComponents.map((icon) => (
            <IconCard key={icon.id || icon.name}>
              <IconInner>
                <img
                  src={import.meta.env.VITE_API_URL + icon.image}
                  alt={icon.name}
                  width={40}
                  height={40}
                />
                <IconLabel>{icon.name}</IconLabel>
              </IconInner>
            </IconCard>
          ))}
        </IconsGrid>
      ) : (
        <p>No matching results</p>
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
  width: 100%;
  max-width: 670px;
  margin: 0 auto;

  @media (max-width: 767px) {
    width: 100%;
    max-width: 320px;
  }
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

const IconsGrid = styled.div`
  width: 1240px;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
  margin-left: 30px;
`;

const IconCard = styled.div`
  position: relative;
  flex: 0 0 calc(100% / 7 - 16px);
  border-radius: 12px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: 12px;

    background: linear-gradient(to right, #2973ff, #932eff);

    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }

  &:hover {
    background-color: #13101f;

    span {
      display: none;
    }
  }
`;

const IconInner = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  background-color: transparent;

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    margin-bottom: 8px;
    transition: transform 0.6s ease;
  }
  ${IconCard}:hover & img {
    transform: translateY(6px);
  }

  p {
    font-size: 14px;
    text-align: center;
    color: #fff;
  }
`;

const IconLabel = styled.span`
  font-size: 14px;
  margin-top: 8px;
  color: white;
  text-align: center;
`;

const FilterItemSvg = styled.svg`
  width: 24px;
  height: 24px;
  vertical-align: middle;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50px;
  right: 100px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: 2px solid #932eff;
    outline-offset: 2px;
  }

  svg {
    display: block;
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
  border-radius: 18px;
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
    top: 2.2px;
    left: 2.2px;
    right: 2.2px;
    bottom: 2px;
    background-color: #29253e;
    border-radius: 16px;
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
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 23px;
  margin-top: 80px;
`;

const MobileSearchButton = styled.button`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
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

const MobileSearchDropdown = styled.div`
  position: fixed;
  margin-top: 15px;
  left: 50%;
  transform: translateX(-50%);

  width: 90%;
  background-color: #221a35;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  animation: dropDown 0.3s ease forwards;

  @keyframes dropDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;

const MobileSearchTitle = styled.h3`
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
  margin-top: 10px;

  span {
    display: block;
  }

  .highlight {
    color: #932eff;
  }
`;

const MobileCloseButton = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: 2px solid #932eff;
    outline-offset: 2px;
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: white;
  }
`;
