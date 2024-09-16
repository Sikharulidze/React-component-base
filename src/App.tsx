import styled from "styled-components";
import Header from "./components/shared/Header";
import { Route, Routes } from "react-router-dom";
import SvgComponents from "./pages/SvgComponents";
import SvgDetail from "./pages/SvgDetail";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import InfoBox from "./components/InfoBox";

function App() {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <Main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/svg" element={<SvgComponents />} />
        <Route path="/svg/:id" element={<SvgDetail />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
      <InfoBox />
    </Main>
  );
}

export default App;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
`;
