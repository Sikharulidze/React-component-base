import styled from "styled-components";
import Header from "./components/shared/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import SvgComponents from "./pages/SvgComponents";
import SvgDetail from "./pages/SvgDetail";

function App() {
  return (
    <Main>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/svg" replace={true} />} />
        <Route path="/svg" element={<SvgComponents />} />
        <Route path="/svg/:id" element={<SvgDetail />} />
      </Routes>
    </Main>
  );
}

export default App;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
`;
