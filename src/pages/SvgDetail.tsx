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
  const [language, setLanguage] = useState("js");
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };
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
          <ButtonContainer>
            <button onClick={() => handleLanguageChange("default")}>
              Default
            </button>
            <button onClick={() => handleLanguageChange("js")}>JS</button>
            <button onClick={() => handleLanguageChange("ts")}>TS</button>
          </ButtonContainer>
          {components.length > 0 && (
            // <SyntaxHighlighter language="typescript" style={atomDark}>
            //   {components[0]["js-snippet"]}
            // </SyntaxHighlighter>
            <SyntaxHighlighter
              language={language === "ts" ? "typescript" : "javascript"}
              style={atomDark}
            >
              {language === "default"
                ? components[0].base
                : language === "js"
                ? components[0]["js-snippet"]
                : components[0]["ts-snippet"]}
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
  @media (max-width: 830px) {
    flex-direction: column;
    gap: 30px;
  }
`;
const DetailContainer = styled.div`
  border: 1px solid #2765d8;
  padding: 24px;
  border-radius: 20px;
  width: 40%;
  @media (max-width: 1000px) {
    padding: 10px;
  }
  @media (max-width: 830px) {
    width: 80%;
    margin: auto;
  }
  @media (max-width: 530px) {
    width: 98%;
    margin: auto;
  }
`;
const DetailImage = styled.div`
  width: 40%;
  overflow: hidden;
  margin: auto;
  margin-bottom: 50px;
`;
const SvgSource = styled.div`
  width: 50%;
  height: 80vh;
  display: flex;
  position: relative;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  @media (max-width: 830px) {
    width: 80%;
    margin: auto;
  }
  @media (max-width: 530px) {
    width: 98%;
    margin: auto;
  }
`;
const ButtonContainer = styled.button`
  width: 100%;
  display: flex;
  margin: auto;
  position: absolute;
  top: -10px;
  background-color: transparent;
  button {
    width: 33.5%;
    padding: 5px 10px;
    background-color: #2765d8;
    color: white;
    font-size: 16px;
    &:hover {
      background-color: #3498db;
      border-color: #3498db;
    }
  }
`;
