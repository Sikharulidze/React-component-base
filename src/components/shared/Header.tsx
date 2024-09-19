import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <DesktopHeader>
        <Link to="/">
          <ImageWrapper>
            <StyledImage src={logo} alt="" />
          </ImageWrapper>
        </Link>
        <nav>
          <StyledNavLink to="/" className={isHomePage ? "home-page" : ""}>
            Home
          </StyledNavLink>
          <StyledNavLink to="/svg" className={isHomePage ? "home-page" : ""}>
            SVG Components
          </StyledNavLink>
          <StyledNavLink
            to="/feedback"
            className={isHomePage ? "home-page" : ""}
          >
            Feedback
          </StyledNavLink>
        </nav>
      </DesktopHeader>
      <MobileHeader>
        <Link to="/">
          <ImageWrapper>
            <StyledImage src={logo} alt="" />
          </ImageWrapper>
        </Link>
        {isOpen ? (
          <nav>
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/svg">SVG Components</StyledNavLink>
            <StyledNavLink to="/feedback">Feedback</StyledNavLink>
          </nav>
        ) : null}
        <Container className={isOpen ? "open" : ""} onClick={handleClick}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </Container>
      </MobileHeader>
    </>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: transparent;
  cursor: pointer;
  padding: 10px;

  .bar1,
  .bar2,
  .bar3 {
    width: 100%;
    height: 4px;
    background: #000;
    margin-bottom: 5px;
    transition: transform 0.3s;
  }
  &.open {
    .bar1 {
      transform: translate(0, 11px) rotate(-45deg);
    }
    .bar2 {
      opacity: 0;
    }
    .bar3 {
      transform: translate(0, -11px) rotate(45deg);
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  margin-right: 20px;
  padding: 5px 10px;
  text-decoration: none;
  font-weight: 800;
  font-size: 22px;
  position: relative;
  &.active {
    color: #2765d8;
  }
  &.active:hover:after {
    color: #2765d8;
    width: 0;
    left: 0;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #2765d8;
    transition: width 0.3s, left 0.3s;
  }
  &:hover {
    color: #2765d8;
  }
  &:hover:after {
    width: 100%;
    left: 0;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 20px;
  border-radius: 50%;
  cursor: pointer;
  &:after {
    content: "Code Simplify";
    position: absolute;
    top: 0;
    font-size: 20px;
    left: 100%;
    width: fit-content;
    height: 100%;
    color: transparent;
    background: linear-gradient(to right, #439cfb, #f187fb);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    font-weight: 900;
    white-space: nowrap;
    transition: opacity 0.3s, left 0.3s;
  }
  &:hover:after {
    opacity: 1;
    left: 110%;
  }
  @media (min-width: 600px) {
    &:after {
      font-size: 30px;
      left: 50%;
    }
    &:hover:after {
      left: 120%;
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;
const DesktopHeader = styled.header`
  padding: 8px 50px 8px 80px;
  text-align: center;
  display: none;
  background-color: transparent;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    display: flex;
  }
`;
const MobileHeader = styled.header`
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  @media screen and (min-width: 768px) {
    display: none;
  }
  nav {
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 96px;
    left: 0;
    transition: opacity 0.3s;
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.5s, opacity 0.3s;
    animation: appear 0.5s forwards;
    z-index: 1000;
  }
  &.open nav {
    transform: translateY(0);
    opacity: 1;
  }
  nav a {
    border-bottom: 1px solid #2765d8;
    text-align: right;
    padding: 8px 0px;
    width: 90%;
    margin: auto;
    z-index: 10;
    font-size: 20px;
  }
  nav a:hover:after {
    width: 0;
  }
  @keyframes appear {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
