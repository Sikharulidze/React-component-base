import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <DesktopHeader>
        <Link to="/">
          <ImageWrapper>
            <StyledImage src={logo} alt="" />
          </ImageWrapper>
        </Link>
        <nav>
          <NavLinksWrapper>
            <StyledNavLink to="/" className={isHomePage ? "home-page" : ""}>
              Home
            </StyledNavLink>
            <StyledNavLink
              to="/icons"
              className={isHomePage ? "home-page" : ""}
            >
              Icons
            </StyledNavLink>
            <StyledNavLink to="/docs" className={isHomePage ? "home-page" : ""}>
              Docs
            </StyledNavLink>
          </NavLinksWrapper>

          <FeedbackContainer>
            <StyledNavLink
              to="/feedback"
              className={
                isHomePage ? "home-page feedback-link" : "feedback-link"
              }
            >
              Feedback
            </StyledNavLink>
          </FeedbackContainer>
        </nav>
      </DesktopHeader>

      <MobileHeader className={isOpen ? "open" : ""}>
        <Link to="/">
          <ImageWrapper>
            <StyledImage src={logo} alt="" />
          </ImageWrapper>
        </Link>

        {isOpen && (
          <nav>
            <MobileNavLinksWrapper>
              <StyledNavLink to="/">Home</StyledNavLink>
              <StyledNavLink to="/svg">SVG Components</StyledNavLink>
              <StyledNavLink
                to="/feedback"
                className={`feedback-link ${isHomePage ? "home-page" : ""}`}
              >
                Feedback
              </StyledNavLink>
            </MobileNavLinksWrapper>
          </nav>
        )}

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

const NavLinksWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex: 1;
  justify-content: center;
`;

const MobileNavLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const DesktopHeader = styled.header`
  padding: 8px 50px 8px 80px;
  text-align: center;
  display: none;
  background-color: #18122a;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
  height: 136px;
  position: relative;

  nav {
    display: flex;
    align-items: center;
    color: #c4c4c4;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    gap: 20px;
  }

  @media (min-width: 768px) {
    display: flex;
  }
`;

const FeedbackContainer = styled.div`
  width: 153px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #2973ff 0%, #932eff 100%);
  border-radius: 20px;
  margin-left: auto;
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

const StyledNavLink = styled(NavLink)`
  color: inherit;
  padding: 5px 10px;
  font-size: 22px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.active {
    color: #2765d8;
  }
  &:hover {
    color: #2765d8;
  }

  &.feedback-link {
    font-weight: normal;
    color: #fff;
    margin: 0;
  }

  &:not(.feedback-link) {
    margin-right: 0;
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
    position: absolute;
    top: 96px;
    left: 0;
    z-index: 1000;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

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
