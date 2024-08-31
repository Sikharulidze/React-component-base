import { useEffect } from "react";
import useSvgComponents from "../store/useSvgComponents";

// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";

const SvgComponents = () => {
  const { components, fetchSvgComponents } = useSvgComponents();
  useEffect(() => {
    fetchSvgComponents();
  }, []);

  return (
    <Main>
      <DisplayBox>
        {components.map((component) => (
          <ImageBox key={component.id}>
            <ImageElement
              src={import.meta.env.VITE_API_URL + component.image}
            />
          </ImageBox>
        ))}
      </DisplayBox>
      {/* <SnippetBox>
        {components.length > 0 && (
          <SyntaxHighlighter language="typescript" style={atomDark}>
            {components[0].base}
          </SyntaxHighlighter>
        )}
      </SnippetBox> */}
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
