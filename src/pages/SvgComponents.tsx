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
      
      <SearchBar searchTerm={searchTerm} onChange={searchChangeHandler} />

      <ContentWrapper>
        <InnerContainer>
          <BoxGrid>
            {Array.from({ length: 21 }).map((_, i) => (
              <StyledBox key={i} />
            ))}
          </BoxGrid>
        </InnerContainer>
      </ContentWrapper>
    </Main>
  );
};

export default SvgComponents;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18122a;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 80px;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1240px;
`;

const BoxGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 31px;
  max-width: 1240px;
  width: 100%;
  justify-content: flex-start;
  box-sizing: border-box;
`;

const StyledBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: 3px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(135deg, #932eff, #2973ff);
  background-color: transparent;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-basis: 150px;
`;

