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
      <DisplayBox>
        {filteredComponents.map((component) => (
          <ImageBox
            key={component.id}
            onClick={() => handleSvgClick(component.id)}
          >
            <ImageElement
              src={import.meta.env.VITE_API_URL + component.image}
            />
          </ImageBox>
        ))}
         {Array.from({ length: 21 }).map((_, i) => (
    <StyledBox key={i}/>
  ))}
      </DisplayBox>
       
    </Main>
  );
};

export default SvgComponents;

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DisplayBox = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 60px);
  gap: 31px;
  justify-content: center;
  padding: 24px;
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

const StyledBox = styled.div`
  width: 60px;
  height: 60px;
  background-color: navy;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

