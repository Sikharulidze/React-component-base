import { useNavigate, useParams } from "react-router-dom";
import useSvgComponents from "../store/useSvgComponents";
import { useState, useEffect, lazy, Suspense } from "react";
import styled from "styled-components";
import { copyClickCounter } from "../services/counter-service";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlighter = lazy(
  () => import("react-syntax-highlighter/dist/esm/default-highlight")
);

const SvgDetail = () => {
  const { id } = useParams();
  const { components, fetchSvgComponents } = useSvgComponents();

  const currentSvg = components.find((component) => component.id === id);

  const navigate = useNavigate();
  const [language, setLanguage] = useState<"default" | "js" | "ts">("default");
  const [copying, setCopying] = useState(false);

  const handleLanguageChange = (lang: "default" | "js" | "ts") =>
    setLanguage(lang);

  useEffect(() => {
    if (components.length === 0) {
      fetchSvgComponents();
    }
  }, [components, fetchSvgComponents]);

  useEffect(() => {
    if (components.length > 0 && currentSvg === undefined) {
      navigate("/svg");
    }
  }, [components, currentSvg, navigate]);

  const getSyntaxHighlighterCode = () => {
    if (!currentSvg) return "";
    return language === "default"
      ? currentSvg.base
      : language === "js"
      ? currentSvg["js-snippet"]
      : currentSvg["ts-snippet"];
  };

  const handleCopyCode = async () => {
    setCopying(true);
    const code = getSyntaxHighlighterCode();
    try {
      await navigator.clipboard.writeText(code ?? "");
      console.log("Code copied to clipboard");
      if (currentSvg) {
        await copyClickCounter(currentSvg.name);
      }
    } catch (error) {
      console.error("Failed to copy code", error);
    } finally {
      setCopying(false);
    }
  };

  if (!components) return <div>Loading...</div>;

  return (
    <DetailSection>
      {currentSvg && (
        <MainDiv>
          <DetailContainer>
            <h2>{currentSvg.name}</h2>
            <DetailImage>
              <img
                src={import.meta.env.VITE_API_URL + currentSvg.image}
                alt={currentSvg.name}
                style={{ width: "100%" }}
              />
            </DetailImage>
            <p className="description">{currentSvg.description}</p>
            <ButtonsWrapper>
              <PropsButtons>
                {currentSvg?.props.map((prop) => (
                  <button key={prop.name}>{prop.name}</button>
                ))}
              </PropsButtons>
            </ButtonsWrapper>
          </DetailContainer>

          <RightColumnWrapper>
            <ButtonsDiv>
              <LeftButtons>
                <button
                  className={`default ${
                    language === "default" ? "active" : ""
                  }`}
                  onClick={() => handleLanguageChange("default")}
                >
                  Default
                </button>
                <button
                  className={`js ${language === "js" ? "active" : ""}`}
                  onClick={() => handleLanguageChange("js")}
                >
                  JS
                </button>
                <button
                  className={`ts ${language === "ts" ? "active" : ""}`}
                  onClick={() => handleLanguageChange("ts")}
                >
                  TS
                </button>
              </LeftButtons>

              <CopyButton onClick={handleCopyCode} disabled={copying}>
                <svg
                  width="68"
                  height="44"
                  viewBox="0 0 68 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="68"
                    height="44"
                    rx="14"
                    fill="url(#paint0_linear_58_288)"
                  />
                  <path
                    d="M28 21C28 18.172 28 16.757 28.879 15.879C29.757 15 31.172 15 34 15H37C39.828 15 41.243 15 42.121 15.879C43 16.757 43 18.172 43 21V26C43 28.828 43 30.243 42.121 31.121C41.243 32 39.828 32 37 32H34C31.172 32 29.757 32 28.879 31.121C28 30.243 28 28.828 28 26V21Z"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    opacity="0.5"
                    d="M28 29C27.2044 29 26.4413 28.6839 25.8787 28.1213C25.3161 27.5587 25 26.7956 25 26V20C25 16.229 25 14.343 26.172 13.172C27.344 12.001 29.229 12 33 12H37C37.7956 12 38.5587 12.3161 39.1213 12.8787C39.6839 13.4413 40 14.2044 40 15"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_58_288"
                      x1="4.41808"
                      y1="0"
                      x2="69.9918"
                      y2="11.0825"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#2973FF" />
                      <stop offset="0.802885" stopColor="#932EFF" />
                    </linearGradient>
                  </defs>
                </svg>
              </CopyButton>
            </ButtonsDiv>

            <RightSideDiv>
              <ContentWrapper>
                <SvgCodeDiv>
                  <Suspense fallback={<div>Loading SyntaxHighlighter...</div>}>
                    <SyntaxHighlighter
                      language={language === "ts" ? "typescript" : "javascript"}
                      style={atomDark}
                      wrapLongLines={true}
                      showLineNumbers={false}
                    >
                      {getSyntaxHighlighterCode()}
                    </SyntaxHighlighter>
                  </Suspense>
                </SvgCodeDiv>
              </ContentWrapper>
            </RightSideDiv>
          </RightColumnWrapper>
        </MainDiv>
      )}
    </DetailSection>
  );
};

export default SvgDetail;

// Styled Components

const DetailSection = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 60px 20px;
  background-color: #18122a;
  color: #fff;
`;

const MainDiv = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  gap: 38px;
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const DetailContainer = styled.div`
  width: 522px;
  height: 552px;
  border: 1px solid #2765d8;
  background: #0d0926;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  h2 {
    font-size: 40px;
    text-align: center;
    color: #2973ff;
    font-weight: 400;
    margin-bottom: 32px;
  }

  p {
    font-size: 20px;
    text-align: center;
    margin: 0;
  }

  p.description {
    color: #ffffff;
  }

  h3 {
    font-size: 26px;
    color: #2765d8;
    text-align: center;
    margin: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
    height: auto;
  }
`;

const DetailImage = styled.div`
  width: 156px;
  margin: 0 auto 30px;

  img {
    width: 100%;
    height: auto;
  }
`;

const RightColumnWrapper = styled.div`
  width: 680px;
  height: 552px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightSideDiv = styled.div`
  flex-grow: 1;
  background: #1e1e1e;
  border-radius: 16px;
  padding: 30px;
  overflow-y: auto;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background: transparent;
`;

const LeftButtons = styled.div`
  display: flex;

  button {
    padding: 6px 14px;
    font-size: 14px;
    color: white;
    background: transparent;
    border-radius: 15px;
    border: 2px solid transparent;
    background-image: linear-gradient(#18122a, #18122a),
      linear-gradient(135deg, #2973ff 0%, #932eff 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: 0.2s;

    &.active {
      background-color: rgb(24, 18, 42);
      background-image: none;
      border: 2px solid #2973ff;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      border-image-source: none;
      border-color: gray;
      background-image: none;
    }
  }

  button.default {
    width: 112px;
    height: 44px;
    cursor: pointer;
  }

  button.js {
    width: 66px;
    height: 44px;
    cursor: pointer;
  }

  button.ts {
    width: 70px;
    height: 44px;
    cursor: pointer;
  }
`;

const CopyButton = styled.button`
  background: none;
  padding: 0;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    display: block;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
`;

const SvgCodeDiv = styled.div`
  pre {
    white-space: pre-wrap !important;
    word-break: break-word;
    font-size: 13px;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const PropsButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;

  button {
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 14px;
    height: 44px;
    color: white;
    background: transparent;
    border: 2px solid transparent;
    background-image: linear-gradient(#18122a, #18122a),
      linear-gradient(135deg, #2973ff 0%, #932eff 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: 0.2s;

    &:hover {
      background-color: #18122a;
    }
  }
`;
