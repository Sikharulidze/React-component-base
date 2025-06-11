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
    bottom: 2.2px;
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
