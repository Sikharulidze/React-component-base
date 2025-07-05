import { useNavigate, useParams } from "react-router-dom";
import useSvgComponents from "../store/useSvgComponents";
import { useState, useEffect, lazy, Suspense } from "react";
import styled from "styled-components";
import { copyClickCounter } from "../services/counter-service";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { keyframes } from "styled-components";

const slideInWithOvershoot = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  60% {
    transform: translateX(0);
    opacity: 1;
  }
  75% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(0);
  }
`;

const SyntaxHighlighter = lazy(
  () => import("react-syntax-highlighter/dist/esm/default-highlight")
);

const SvgDetail = () => {
  const [clickedProps, setClickedProps] = useState<{ [key: string]: boolean }>(
    {}
  );

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
    const code = getSyntaxHighlighterCode();
    try {
      await navigator.clipboard.writeText(code ?? "");
      if (currentSvg) {
        await copyClickCounter(currentSvg.name);
      }
      setCopying(true);
      setTimeout(() => setCopying(false), 1000); // 5 seconds
    } catch (error) {
      console.error("Failed to copy code", error);
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
                {currentSvg?.props.map((prop) => {
                  const isVisible = clickedProps[prop.name] || false;

                  const toggleTooltip = () => {
                    setClickedProps((prev) => ({
                      ...prev,
                      [prop.name]: !prev[prop.name],
                    }));
                  };

                  const hideTooltip = () => {
                    setClickedProps((prev) => ({
                      ...prev,
                      [prop.name]: false,
                    }));
                  };

                  return (
                    <TooltipWrapper
                      key={prop.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTooltip();
                      }}
                      onMouseLeave={hideTooltip}
                    >
                      <TooltipBox $visible={isVisible}>
                        <p style={{ margin: 0, fontWeight: "bold" }}>
                          {prop.name}
                        </p>
                        <p style={{ margin: "4px 0" }}>{prop.description}</p>
                        <p style={{ margin: 0 }}>
                          <strong>Required:</strong>{" "}
                          {prop.require ? "Yes" : "No"}
                        </p>

                        <svg
                          width="17"
                          height="18"
                          viewBox="0 0 17 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            position: "absolute",
                            bottom: "-9px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 5,
                            pointerEvents: "none",
                          }}
                        >
                          <rect
                            x="1.41421"
                            y="9.14214"
                            width="10"
                            height="10"
                            transform="rotate(-45 1.41421 9.14214)"
                            fill="#18122A"
                            stroke="url(#paint0_linear_796_1372)"
                            strokeWidth="2"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_796_1372"
                              x1="0.779661"
                              y1="9.14214"
                              x2="12.5414"
                              y2="10.4284"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#2973FF" />
                              <stop offset="0.802885" stopColor="#932EFF" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </TooltipBox>

                      <button>{prop.name}</button>
                    </TooltipWrapper>
                  );
                })}
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
              {copying && (
                <CopyNotification>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 11C6 8.172 6 6.757 6.879 5.879C7.757 5 9.172 5 12 5H15C17.828 5 19.243 5 20.121 5.879C21 6.757 21 8.172 21 11V16C21 18.828 21 20.243 20.121 21.121C19.243 22 17.828 22 15 22H12C9.172 22 7.757 22 6.879 21.121C6 20.243 6 18.828 6 16V11Z"
                      stroke="white"
                      stroke-width="1.5"
                    />
                    <path
                      opacity="0.5"
                      d="M6 19C5.20435 19 4.44129 18.6839 3.87868 18.1213C3.31607 17.5587 3 16.7956 3 16V10C3 6.229 3 4.343 4.172 3.172C5.344 2.001 7.229 2 11 2H15C15.7956 2 16.5587 2.31607 17.1213 2.87868C17.6839 3.44129 18 4.20435 18 5"
                      stroke="white"
                      stroke-width="1.5"
                    />
                  </svg>
                  Successfully Copied
                </CopyNotification>
              )}
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
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: 0.2s;
    position: relative;

    &.active {
      background-color: rgb(24, 18, 42);
      background-image: linear-gradient(#18122a, #18122a),
        linear-gradient(45deg, #2973ff 0%, #932eff 80%);
    }

    &:disabled {
      opacity: 0.6;
      border-image-source: none;
      border-color: gray;
      background-image: none;
    }

    &.js:not(.active)::after,
    &.ts:not(.active)::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(to right, #2973ff 0%, #932eff 80%);
    }
  }

  button.default {
    width: 112px;
    height: 44px;
    border: 2px solid transparent;
    background-image: linear-gradient(#18122a, #18122a),
      linear-gradient(45deg, #2973ff 0%, #932eff 80%);
  }

  button.js {
    width: 66px;
    height: 44px;
    cursor: pointer;
    border: 2px solid transparent;
    background-image: linear-gradient(#18122a, #18122a),
      linear-gradient(0%, #2973ff 45%, #932eff 80%);
  }

  button.ts {
    width: 70px;
    height: 44px;
    cursor: pointer;
    border: 2px solid transparent;
    background-image: linear-gradient(#18122a, #18122a),
      linear-gradient(0%, #2973ff 45%, #932eff 80%);
  }
`;

const CopyButton = styled.button<{ copying?: boolean }>`
  background: transparent;
  padding: 0;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;

  border: 2px solid transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: linear-gradient(45deg, #2973ff 0%, #932eff 80%) border-box,
      transparent padding-box;

    border-color: transparent;

    svg rect {
      fill: #0d0926 !important;
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: none;
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
    border-radius: 14px;
    font-size: 14px;
    height: 44px;
    color: white;
    background: transparent;
    border: 2px solid transparent;
    background-image: linear-gradient(#18122a, #18122a),
      linear-gradient(45deg, #2973ff 0%, #932eff 80%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: 0.2s;

    &:hover {
      background-color: #18122a;
    }
  }
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover > div {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -10px);
  }
`;

const TooltipBox = styled.div<{ $visible?: boolean }>`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  background: #18122a;
  color: #fff;
  padding: 10px 12px;
  border-radius: 15px;
  margin-bottom: 10px;

  border: 2px solid transparent;
  background-image: linear-gradient(#18122a),
    linear-gradient(135deg, #2973ff 0%, #932eff 100%);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;

  width: 140px;
  text-align: center;
  font-size: 13px;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transition: all 0.25s ease-in-out;
  z-index: 10;
  box-shadow: 0px 0px 8px rgba(147, 46, 255, 0.5);
  overflow: visible;
  white-space: normal;
  p,
  span {
    font-size: 11px;
  }
`;

const CopyNotification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 286px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 20px;
  font-family: sans-serif;
  color: white;
  border: 2px solid transparent;
  border-radius: 15px;
  background-image: linear-gradient(#0d0926, #0d0926),
    linear-gradient(90deg, #2973ff, #932eff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  animation: ${slideInWithOvershoot} 0.3s ease forwards;
`;
