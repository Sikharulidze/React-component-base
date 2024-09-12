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
          {/* <p>
        Explore our comprehensive collection of React components designed
        for developers of all levels. Our site offers a range of components,
        each with detailed code snippets in both JavaScript and TypeScript.
        Whether you're building a new project or enhancing an existing one,
        you'll find easy-to-use elements that fit seamlessly into your
        workflow. Click on any component to view its code, copy it, and
        integrate it into your applications with ease. Dive in and elevate
        your development experience today!
      </p> */}
          {/* <p>SVG icons components</p> */}
          {/* <h3>We Value Your Feedback</h3> */}
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
          <button>Start Now</button>
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
            We’re a team of developers dedicated to making your development life
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
