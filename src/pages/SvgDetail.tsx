import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const fetchSvgData = async (id: string) => {
  try {
    const response = await axios.get(`https://your-api.com/svg/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const SvgDetail = () => {
  const { id } = useParams();

  return (
    <>
      <h1>{id}</h1>
    </>
  );
};

export default SvgDetail;
