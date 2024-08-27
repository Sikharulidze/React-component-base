import { useEffect } from "react";
import useSvgComponents from "../store/useSvgComponents";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dark,
  atomDark,
  okaidia,
  oneDark,
  tomorrow,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";

const SvgComponents = () => {
  const { components, fetchSvgComponents } = useSvgComponents();
  useEffect(() => {
    fetchSvgComponents();
  }, []);
  console.log(components);
  return (
    <Main>
      Svg Component page
      <SnippetBox>
        {components.length > 0 && (
          <SyntaxHighlighter language="typescript" style={atomDark}>
            {components[0]["js-snippet"]}
          </SyntaxHighlighter>
        )}
      </SnippetBox>
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

const SnippetBox = styled.div`
  width: 50%;
`;
