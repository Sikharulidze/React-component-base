import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <DesktopHeader>
        <HeaderInner>
          <LeftSide>
            <Link to="/">
              <LogoContainer>
                <ImageWrapper>
                  <StyledImage src={logo} alt="Logo" />
                </ImageWrapper>
                <span
                  style={{
                    fontSize: "20px",
                    color: "#FFFFFF",
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                    userSelect: "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  Code Simplify
                </span>
              </LogoContainer>
            </Link>
          </LeftSide>

          <LinksContainer>
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
          </LinksContainer>

          <RightSide>
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
          </RightSide>
        </HeaderInner>
      </DesktopHeader>

      <MobileHeader>
        <Link to="/">
          <ImageWrapper>
            <StyledImage src={logo} alt="Logo" />
          </ImageWrapper>
        </Link>

        {isOpen && (
          <MobileNav>
            <MobileNavLinksWrapper>
              <StyledNavLink to="/">Home</StyledNavLink>
              <StyledNavLink to="/icons">Icons</StyledNavLink>
              <StyledNavLink to="/docs">Docs</StyledNavLink>
              <StyledNavLink to="/feedback" className="feedback-link">
                Feedback
              </StyledNavLink>
            </MobileNavLinksWrapper>
          </MobileNav>
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

// Styled components

const DesktopHeader = styled.header`
  display: none;
  background-color: #18122a;
  align-items: center;
  height: 136px;
  width: 100%;

  @media (min-width: 700px) {
    display: flex;
  }
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  gap: 40px;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-left: 60px;
`;

const RightSide = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding-right: 60px;
`;

const LinksContainer = styled.nav`
  width: 327px;
  height: 80px;
  background-color: rgba(126, 126, 126, 0.2);
  border-radius: 14px;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;


const FeedbackContainer = styled.div`
  width: 153px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #2973ff 0%, #932eff 100%);
  border-radius: 20px;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-right: 20px;
  border-radius: 50%;
  cursor: pointer;

  &:hover:after {
    opacity: 1;
  }

  @media (min-width: 390px) {
    &:after {
      font-size: 30px;
    }
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;
const MobileHeader = styled.header`
  width: 100%; 
  max-width: 390px; 
  background-color: #18122a;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px; 

  @media screen and (min-width: 390px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  position: absolute;
  top: 60px; 
  left: 0;
  width: 100%;
  background-color: #2c2546;
  padding: 20px 0;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MobileNavLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  color: #e0e0e0;
  font-size: 24px; 
  text-decoration: none;
  padding: 10px 0;
  width: 100%;
  text-align: center;

  &.feedback-link {
    font-weight: 700;
    background: linear-gradient(135deg, #2973ff 0%, #932eff 100%);
    border-radius: 14px;
    padding: 12px 0;
    margin: 0 16px;
    color: white;
  }

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 40px; 
  height: 30px;
  background-color: transparent;
  cursor: pointer;
  padding: 5px;

  .bar1,
  .bar2,
  .bar3 {
    width: 100%;
    height: 3px;
    background: #fff;
    margin-bottom: 5px;
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  &.open .bar1 {
    transform: translateY(9px) rotate(-45deg);
  }

  &.open .bar2 {
    opacity: 0;
  }

  &.open .bar3 {
    transform: translateY(-9px) rotate(45deg);
  }
`;
