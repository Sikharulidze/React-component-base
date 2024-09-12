import bg from "../assets/images/3dBackground.jpg";
import feedback from "../assets/images/customer-experience.png";
import icon from "../assets/images/component.png";
import logo from "../assets/images/logo.png";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
  const navigate = useNavigate();
  const handleNavigateToSvgPage = () => {
    navigate("/svg");
  };
  return (
    <>
      {isHomePage && (
        <style>{`
    body {
      background: url("${bg}");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  `}</style>
      )}
      <HomeContainer>
        <div>
          <h1>Welcome to React Components Central</h1>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,192L120,202.7C240,213,480,235,720,218.7C960,203,1200,149,1320,122.7L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
      </HomeContainer>
      <TextContainer>
        <div>
          <p>SVG icons components</p>
          <p>
            Explore our comprehensive collection of React components designed
            for developers of all levels. Our site offers a range of components,
            each with detailed code snippets in both JavaScript and TypeScript.
            Whether you're building a new project or enhancing an existing one,
            you'll find easy-to-use elements that fit seamlessly into your
            workflow. Click on any component to view its code, copy it, and
            integrate it into your applications with ease. Dive in and elevate
            your development experience today!
          </p>
          <button onClick={handleNavigateToSvgPage}>Start Now</button>
        </div>
        <img src={icon} alt="" />
      </TextContainer>
      <TextContainer>
        <img src={feedback} alt="" />
        <div>
          <p>We Value Your Feedback!</p>
          <p>
            Please know that your feedback is taken seriously, and we are
            committed to using it to make meaningful changes. If you have more
            thoughts to share or need assistance, feel free to reach out to us.
            We're here to help and look forward to hearing from you!
          </p>
          <button>Leave feedback</button>
        </div>
      </TextContainer>
      <TextContainer>
        <div className="about">
          <p>Who we are?</p>
          <p>
            We're a team of developers dedicated to making your development life
            easier and more enjoyable. Our focus is on creating solutions that
            streamline your workflow and enhance your productivity. From
            efficient tools to seamless integrations, we're here to help you
            tackle challenges and achieve your goals with ease.
          </p>
          <img src={logo} alt="" />
        </div>
      </TextContainer>
    </>
  );
};

export default Home;
const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;

  div {
    width: 70%;
    margin: auto;
    height: fit-content;
    border-radius: 20px;
    padding: 20px 50px;
  }
  h1 {
    font-size: 80px;
    margin-top: 100px;
    text-align: center;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 2px #000;
  }
  p {
    text-align: center;
    font-size: 18px;
  }
  h3 {
    font-size: 35px;
    text-align: center;
  }
  svg {
    position: absolute;
    bottom: -98px;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  background: #fff;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 50%;
  }
  p:nth-child(1) {
    font-size: 30px;
    color: #1084ff;
    font-weight: bold;
    margin-bottom: 50px;
  }
  p {
    color: #000;
    width: 100%;
    font-size: 18px;
    color: gray;
  }
  button {
    background: linear-gradient(to right, #1084ff, #ee2fff);
    color: #fff;
    border-radius: 6px;
    padding: 10px 20px;
    display: block;
    margin-top: 20px;
    font-size: 18px;
    cursor: pointer;
    transition: 0.3s;
  }
  button:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
  .about {
    width: 80%;
    margin: auto;
    text-align: center;
  }
`;
