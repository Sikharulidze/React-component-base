import styled from "styled-components";
import Header from "./components/shared/Header";
import { Routes } from "react-router-dom";

function App() {
  return (
    <Main>
      <Header />
      <Routes></Routes>
    </Main>
  );
}

export default App;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
`;
