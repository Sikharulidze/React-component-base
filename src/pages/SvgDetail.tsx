import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import useSvgComponents from "../store/useSvgComponents";

const SvgDetail = () => {
  const { id } = useParams();
  const { components } = useSvgComponents();
  const currentComponent = components.find((component) => component.id === id);

  return (
    <>
      <div>
        {currentComponent && (
          <div>
            <h1>{currentComponent.name}</h1>
            <img
              src={import.meta.env.VITE_API_URL + currentComponent.image}
              alt={currentComponent.name}
            />
            <p>{currentComponent.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SvgDetail;
