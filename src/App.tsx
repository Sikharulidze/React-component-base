import styled from "styled-components";
import Header from "./components/shared/Header";
import { Route, Routes } from "react-router-dom";
import SvgComponents from "./pages/SvgComponents";
import SvgDetail from "./pages/SvgDetail";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <Main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/icons" element={<SvgComponents />} />
        <Route path="/svg/:id" element={<SvgDetail />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
      <Footer />
    </Main>
  );
}

export default App;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(45deg, #030219 0%, #3f2a64 100%);
`;
