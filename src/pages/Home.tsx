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
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [location]);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navigate = useNavigate();
  const handleNavigateToSvgPage = () => {
    navigate("/svg");
  };
  const handleNavigateToFeedbackPage = () => {
    navigate("/feedback");
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
            d="M0,32L120,80C240,128,480,224,720,224C960,224,1200,128,1320,80L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
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
        <img src={icon} alt="components icon" />
      </TextContainer>
      <TextContainer>
        <img src={feedback} alt="feedback icon" />
        <div style={{ opacity: scrollPosition > 1000 ? 1 : 0 }}>
          <p>We Value Your Feedback!</p>
          <p>
            Please know that your feedback is taken seriously, and we are
            committed to using it to make meaningful changes. If you have more
            thoughts to share or need assistance, feel free to reach out to us.
            We're here to help and look forward to hearing from you!
          </p>
          <button onClick={handleNavigateToFeedbackPage}>Leave feedback</button>
        </div>
      </TextContainer>
      <TextContainer>
        <div
          className="about"
          style={{ opacity: scrollPosition > 1300 ? 1 : 0 }}
        >
          <p>Who we are?</p>
          <p>
            We're a team of developers dedicated to making your development life
            easier and more enjoyable. Our focus is on creating solutions that
            streamline your workflow and enhance your productivity. From
            efficient tools to seamless integrations, we're here to help you
            tackle challenges and achieve your goals with ease.
          </p>
          <img src={logo} alt="logo" />
        </div>
      </TextContainer>
    </>
  );
};

export default Home;
const HomeContainer = styled.div`
  width: 100%;
  height: 85vh;
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
  svg {
    position: absolute;
    bottom: 0px;
  }
  @media screen and (max-width: 800px) {
    h1 {
      font-size: 60px;
    }
    div {
      width: 100%;
    }
  }
  @media screen and (max-width: 570px) {
    height: 82vh;
    h1 {
      font-size: 40px;
      text-align: center;
    }
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
    transition: opacity 0.5s ease-in-out;
    animation: slideIn 1s ease-in-out;
    animation-delay: 0.5s;
  }
  img {
    width: 40%;
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
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes slideIn {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @media screen and (max-width: 1190px) {
    padding: 20px 30px;
    div {
      width: 40%;
    }
  }
  @media screen and (max-width: 900px) {
    padding: 20px;
    div {
      width: 80%;
      text-align: center;
    }
    button {
      margin: auto;
      margin-top: 20px;
    }
    img {
      width: 30%;
    }
    flex-direction: column;
  }
  @media screen and (max-width: 570px) {
    padding: 50px 0 0 0;
    div {
      width: 98%;
      text-align: center;
    }
    button {
      margin: auto;
      margin-top: 20px;
    }
    img {
      width: 80%;
    }
    flex-direction: column;
  }
`;
