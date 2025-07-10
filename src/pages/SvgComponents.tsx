import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import useSvgComponents from "../store/useSvgComponents";
import SearchBar from "../components/SearchBar";

const dropDown = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -120%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -120%);
  }
`;

const categoryMap: Record<string, string> = {
  "interface & ui": "user interface",
  "web & communication": "social media",
  "industry & technology": "programming",
  "business & work": "currency",
  "culture & lifestyle": "brands",
};

const SvgComponents = () => {
  const { components, fetchSvgComponents } = useSvgComponents();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [clickedIconId, setClickedIconId] = useState<string | null>(null);

  useEffect(() => {
    fetchSvgComponents();
  }, [fetchSvgComponents]);

  useEffect(() => {
    console.log(
      "Component categories:",
      components.map((c) => c.category)
    );
  }, [components]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category")?.toLowerCase().trim() || null;

    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search, selectedCategory]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const normalizedSelectedCategory =
      selectedCategory?.trim().toLowerCase() || null;

    if (normalizedSelectedCategory) {
      if (params.get("category") !== normalizedSelectedCategory) {
        params.set("category", normalizedSelectedCategory);
        navigate(
          { pathname: location.pathname, search: params.toString() },
          { replace: true }
        );
      }
    } else if (params.has("category")) {
      params.delete("category");
      navigate(
        { pathname: location.pathname, search: params.toString() },
        { replace: true }
      );
    }
  }, [selectedCategory, navigate, location.pathname, location.search]);

  const filteredComponents = useMemo(() => {
    return components.filter((icon) => {
      const iconCategory = icon.collectionName?.trim().toLowerCase() || "";
      const selected = selectedCategory?.trim().toLowerCase() || "";

      const iconName = icon.name?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      const matchesSearch = iconName.includes(search);
      const matchesCategory = selected ? iconCategory === selected : true;

      return matchesSearch && matchesCategory;
    });
  }, [components, searchTerm, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategorySelect = (categoryLabel: string) => {
    const backendCategory =
      categoryMap[categoryLabel.toLowerCase()] || categoryLabel.toLowerCase();

    setSelectedCategory(backendCategory);

    navigate(`/icons?category=${encodeURIComponent(backendCategory)}`);
    setIsOpen(false);
  };

  const handleClick = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      setIsOpen(true);
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isMobile = window.innerWidth <= 768;
      const target = e.target as Node;

      if (isMobile) {
        if (
          isMobileSearchOpen &&
          mobileSearchRef.current &&
          !mobileSearchRef.current.contains(target)
        ) {
          closeMobileSearch();
        }

        return;
      }

      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        closeDropdown();
      }

      if (
        isMobileSearchOpen &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(target)
      ) {
        closeMobileSearch();
      }
    };

    if (isMobileSearchOpen || isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileSearchOpen, isOpen]);

  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target as Node)
      ) {
        closeMobileSearch();
      }
    };

    if (isMobileSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileSearchOpen]);

  const closeMobileSearch = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileSearchOpen(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSearchOpen]);

  return (
    <Main>
      {isMobileSearchOpen && (
        <MobileSearchDropdown ref={mobileSearchRef} isClosing={isClosing}>
          <MobileSearchTitle>
            <span className="highlight">Uncover</span>
            <span>Something</span>
            <span className="highlight">Exciting!</span>
          </MobileSearchTitle>

          <SearchBarWrapper>
            <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
          </SearchBarWrapper>
        </MobileSearchDropdown>
      )}

      <FilterWrapper>
        <DesktopSearchAndFilter>
          <SearchBarWrapper>
            <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
          </SearchBarWrapper>

          <FilterBoxWrapper>
            <FilterBox onClick={handleClick} role="button" tabIndex={0}>
              Filter
            </FilterBox>
          </FilterBoxWrapper>
        </DesktopSearchAndFilter>
      </FilterWrapper>

      {(isOpen || (isClosing && window.innerWidth > 768)) && (
        <FilterDropdown ref={dropdownRef} isClosing={isClosing}>
          <CloseButton
            aria-label="Close filter dropdown"
            onClick={closeDropdown}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                closeDropdown();
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
              <FilterItem
                type="button"
                onClick={() => {
                  handleCategorySelect("interface & ui");
                }}
                aria-pressed={selectedCategory === "user interface"}
              >
                <FilterItemSvg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                    fill="white"
                  />
                </FilterItemSvg>
                Interface & UI
              </FilterItem>

              <FilterItem
                type="button"
                onClick={() => handleCategorySelect("web & communication")}
                aria-pressed={selectedCategory === "social media"}
              >
                <FilterItemSvg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                    fill="white"
                  />
                </FilterItemSvg>
                Web & Communication
              </FilterItem>
            </FilterRow>
            <FilterRow>
              <FilterItem
                type="button"
                onClick={() => handleCategorySelect("people & society")}
                aria-pressed={selectedCategory === "people & society"}
              >
                <FilterItemSvg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                    fill="white"
                  />
                </FilterItemSvg>
                People & Society
              </FilterItem>

              <FilterItem
                type="button"
                onClick={() => handleCategorySelect("education & science")}
                aria-pressed={selectedCategory === "education & science"}
              >
                <FilterItemSvg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                    fill="white"
                  />
                </FilterItemSvg>
                Education & Science
              </FilterItem>
            </FilterRow>
            <FilterRow>
              <FilterItem
                type="button"
                onClick={() => handleCategorySelect("health & safety")}
                aria-pressed={selectedCategory === " health & safety"}
              >
                <FilterItemSvg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                    fill="white"
                  />
                </FilterItemSvg>
                Health & Safety
              </FilterItem>

              <FilterItem
                type="button"
                onClick={() => handleCategorySelect("business & work")}
                aria-pressed={selectedCategory === "currency"}
              >
                <FilterItemSvg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                    fill="white"
                  />
                </FilterItemSvg>
                Business & Work
              </FilterItem>
            </FilterRow>
            <FilterRow>
              <FilterItem
                type="button"
                onClick={() => handleCategorySelect("industry & technology")}
                aria-pressed={selectedCategory === "programming"}
              >
                <FilterItemSvg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                    fill="white"
                  />
                </FilterItemSvg>
                Industry & Technology
              </FilterItem>

              <FilterItem
                type="button"
                onClick={() => handleCategorySelect("travel & transport")}
                aria-pressed={selectedCategory === "travel & transport"}
              >
                <FilterItemSvg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                    fill="white"
                  />
                </FilterItemSvg>
                Travel & Transport
              </FilterItem>
            </FilterRow>
            <FilterRow>
              <FilterItem
                type="button"
                onClick={() => handleCategorySelect("culture & lifestyle")}
                aria-pressed={selectedCategory === "brands"}
              >
                <FilterItemSvg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.691 4C19.9056 4 20.1113 4.08523 20.2631 4.23695C20.4148 4.38866 20.5 4.59443 20.5 4.80899V12C20.5 12.2146 20.4148 12.4203 20.2631 12.572C20.1113 12.7238 19.9056 12.809 19.691 12.809C19.4765 12.809 19.2707 12.7238 19.119 12.572C18.9673 12.4203 18.882 12.2146 18.882 12V6.76135L7.26135 18.382H12.5C12.7146 18.382 12.9203 18.4673 13.072 18.619C13.2238 18.7707 13.309 18.9765 13.309 19.191C13.309 19.4056 13.2238 19.6113 13.072 19.7631C12.9203 19.9148 12.7146 20 12.5 20H5.30899C5.09443 20 4.88866 19.9148 4.73695 19.7631C4.58523 19.6113 4.5 19.4056 4.5 19.191V12C4.5 11.8938 4.52093 11.7886 4.56158 11.6904C4.60224 11.5923 4.66183 11.5031 4.73695 11.428C4.81207 11.3528 4.90125 11.2932 4.9994 11.2526C5.09755 11.2119 5.20275 11.191 5.30899 11.191C5.41523 11.191 5.52042 11.2119 5.61858 11.2526C5.71673 11.2932 5.80591 11.3528 5.88103 11.428C5.95615 11.5031 6.01574 11.5923 6.0564 11.6904C6.09705 11.7886 6.11798 11.8938 6.11798 12V17.2387L17.7387 5.61798H12.5C12.2854 5.61798 12.0797 5.53275 11.928 5.38103C11.7762 5.22932 11.691 5.02355 11.691 4.80899C11.691 4.59443 11.7762 4.38866 11.928 4.23695C12.0797 4.08523 12.2854 4 12.5 4H19.691Z"
                    fill="white"
                  />
                </FilterItemSvg>
                Culture & Lifestyle
              </FilterItem>

              <FilterItem
                type="button"
                onClick={() => handleCategorySelect("nature & entertainment")}
                aria-pressed={selectedCategory === "nature & entertainment"}
              >
                <FilterItemSvg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
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

        <MobileFilterButton onClick={() => setIsOpen(true)}>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7.5L20 7.5M6.66667 12.5H17.3333M9.86667 17.5H14.1333"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </MobileFilterButton>
      </MobileActionsWrapper>

      {filteredComponents.length > 0 ? (
        <IconsGrid>
          {filteredComponents.map((icon) => (
            <IconCard
              key={icon.id || icon.name}
              onClick={() => {
                setClickedIconId(icon.id);
                setTimeout(() => {
                  navigate(`/svg/${icon.id}`);
                }, 80);
              }}
            >
              <IconInner clicked={clickedIconId === icon.id}>
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
  background: linear-gradient(45deg, #030219 0%, #3f2a64 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
    margin-top: 0;
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
  background: linear-gradient(45deg, #2973ff 0%, #932eff 80%);
  padding: 2px;
  border-radius: 14px;
  width: 108px;
  height: 60px;
  display: flex;
`;

const FilterBox = styled.div`
  background: transparent;
  color: #ffffff;
  font-size: 18px;
  border-radius: 12px;
  user-select: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background: #0d0926;
  }
`;

interface FilterDropdownProps {
  isClosing: boolean;
}

const FilterDropdown = styled.div<FilterDropdownProps>`
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
  animation: ${({ isClosing }) =>
    isClosing ? "slideOut 0.3s ease forwards" : "slideIn 0.3s ease forwards"};

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    padding: 20px 16px 20px;
    justify-content: flex-start;
  }
`;

const IconsGrid = styled.div`
  width: 1240px;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 30px;
  padding-bottom: 80px;
  row-gap: 41px;

  @media (max-width: 768px) {
    width: 350px;
    margin-top: 0;
  }
`;

const IconCard = styled.div`
  position: relative;
  flex: 0 0 calc((1240px - 6 * 41px) / 7);
  max-width: calc((1240px - 6 * 30px) / 7);
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

    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
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

const IconInner = styled.div<{ clicked?: boolean }>`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ clicked }) => (clicked ? "#932EFF" : "transparent")};
  transition: background-color 0.2s ease;

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

  svg {
    display: block;
  }

  @media (max-width: 768px) {
    top: 20px;
    right: 20px;
  }
`;

const FilterTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 36px;
  text-align: center;

  span {
    color: #932eff;
  }

  @media (max-width: 768px) {
    margin-top: 20px;

    span {
      display: block;
    }
  }
`;

const FilterRowsContainer = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    width: 349px;
  }
`;
const FilterItem = styled.button`
  position: relative;
  padding: 0 30px;
  white-space: nowrap;
  width: fit-content;
  height: 60px;
  border-radius: 14px;
  background: linear-gradient(45deg, #2973ff 0%, #932eff 80%);
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
    border-radius: 12px;
    z-index: -1;
  }

  &:hover::before {
    background-color: #1f1c33;
  }
`;

const MobileActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 23px;
  margin-bottom: 20px;
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
const MobileSearchDropdown = styled.div<{ isClosing: boolean }>`
  position: fixed;
  top: 170px;
  left: 50%;
  width: 90%;
  background-color: #18122a;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  animation: ${({ isClosing }) => (isClosing ? slideUp : dropDown)} 0.3s ease
    forwards;
  transform: translate(-50%, 0);
  z-index: 9999;
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
