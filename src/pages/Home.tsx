import bg from "../assets/images/3dBackground.jpg";
import feedback from "../assets/images/customer-experience.png";
import icon from "../assets/images/component.png";
import logo from "../assets/images/logo.png";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const Home = () => {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);
  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [location]);
  return <></>;
};

export default Home;
