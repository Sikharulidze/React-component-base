import { useEffect, useState } from "react";
import useSvgComponents from "../store/useSvgComponents";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
const SvgComponents = () => {
  const { components, fetchSvgComponents } = useSvgComponents();
  interface SvgComponent {
    id: string;
    name: string;
    image: string;
    "js-snippet": string;
  }
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredComponents, setFilteredComponents] = useState<SvgComponent[]>(
    []
  );
  useEffect(() => {
    fetchSvgComponents();
  }, []);
  const handleSvgClick = (id: string) => {
    navigate(`/svg/${id}`);
  };
  useEffect(() => {
    const escapedSearchTerm = searchTerm
      .trim()
      .toLowerCase()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const filteredComponents = components.filter((component) =>
      component.name.toLowerCase().includes(escapedSearchTerm)
    );
    setFilteredComponents(filteredComponents);
  }, [components, searchTerm]);
  return (
    <Main>
      <SearchBar
        searchTerm={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
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
      </DisplayBox>
      {/* <div style={{width: "500px"}}>
        {components.length > 0 && (
          <SyntaxHighlighter language="typescript" style={atomDark}>
            {components[0]["js-snippet"]}
          </SyntaxHighlighter>
        )}
      </div> */}
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
  width: 100%;
  padding: 24px;
  display: flex;
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

// const SnippetBox = styled.div`
//   width: 50%;
// `;
