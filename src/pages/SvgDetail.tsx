import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate, useParams } from "react-router-dom";
import useSvgComponents from "../store/useSvgComponents";
import { useState, useEffect } from "react";
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
      <div>
        {currentSvg && (
          <div>
            <h1>{id}</h1>
            <h1>{currentSvg.name}</h1>
            <img
              src={import.meta.env.VITE_API_URL + currentSvg.image}
              alt={currentSvg.name}
            />
            <p>{currentSvg.description}</p>
          </div>
        )}
        <div style={{ width: "500px" }}>
          {components.length > 0 && (
            <SyntaxHighlighter language="typescript" style={atomDark}>
              {components[0]["js-snippet"]}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </>
  );
};

export default SvgDetail;
