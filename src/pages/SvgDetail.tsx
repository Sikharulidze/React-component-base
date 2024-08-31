import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate, useParams } from "react-router-dom";
import useSvgComponents from "../store/useSvgComponents";
import { useState, useEffect } from "react";
import styled from "styled-components";
const SvgDetail = () => {
  const { id } = useParams();
  const { components } = useSvgComponents();
  const navigate = useNavigate();
  if (!components) {
    return <div>Loading...</div>;
  }
  const currentSvg = components.find((component) => component.id === id);
  console.log(currentSvg);
  useEffect(() => {
    if (currentSvg === undefined) {
      navigate("/svg");
    }
  }, [currentSvg]);
  return (
    <>
      <DetailSection>
        <DetailContainer>
          {currentSvg && (
            <div>
              <h2>{currentSvg.name}</h2>
              <DetailImage>
                <img
                  style={{ width: "100%" }}
                  src={import.meta.env.VITE_API_URL + currentSvg.image}
                  alt={currentSvg.name}
                />
              </DetailImage>
              <p>{currentSvg.description}</p>
            </div>
          )}
        </DetailContainer>
        <SvgSource>
          {components.length > 0 && (
            <SyntaxHighlighter language="typescript" style={atomDark}>
              {components[0]["js-snippet"]}
            </SyntaxHighlighter>
          )}
        </SvgSource>
      </DetailSection>
    </>
  );
};

export default SvgDetail;
const DetailSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 24px;
  h2 {
    font-size: 40px;
    text-align: center;
    margin-bottom: 30px;
    color: #2765d8;
    font-weight: 400;
  }
  p {
    font-size: 22px;
    text-align: center;
  }
`;
const DetailContainer = styled.div`
  border: 1px solid #2765d8;
  padding: 24px;
  border-radius: 20px;
  max-height: 80vh;
`;
const DetailImage = styled.div`
  width: 50%;
  overflow: hidden;
  margin: auto;
  margin-bottom: 20px;
`;
const SvgSource = styled.div`
  width: 50%;
  height: 70vh;
  overflow: auto;
`;
