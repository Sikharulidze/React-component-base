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
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location]);

  return (
    <>
      {/* Desktop Header */}
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

      {/* Mobile Header */}
      <MobileViewport>
        <MobileHeader>
          <LogoWrapper>
            <StyledImage src={logo} alt="Logo" />
          </LogoWrapper>

          <MobileNavLinksWrapper>
            <NavGroup>
              <StyledNavLink to="/">Home</StyledNavLink>
              <StyledNavLink to="/icons">Icons</StyledNavLink>
              <StyledNavLink to="/docs">Docs</StyledNavLink>
            </NavGroup>

            <MobileFeedbackButton to="/feedback" aria-label="Feedback">
              <svg
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="10.5"
                  width="23"
                  height="2"
                  rx="1"
                  fill="white"
                />
                <rect
                  x="15"
                  y="21.5"
                  width="10"
                  height="2"
                  rx="1"
                  fill="white"
                />
                <rect
                  x="-10"
                  y="-9.5"
                  width="10"
                  height="2"
                  rx="1"
                  fill="white"
                  transform="translate(10 10)"
                />
              </svg>
            </MobileFeedbackButton>
          </MobileNavLinksWrapper>
        </MobileHeader>
      </MobileViewport>
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

  @media (min-width: 768px) {
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
  align-items: center;
  justify-content: center;
  padding: 0 12px;
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

const LogoWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const MobileHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background-color: #18122a;
  width: 100%;
  height: 158px;
  margin-bottom: 80px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileViewport = styled.div`
  width: 100%;
  height: auto;
  background-color: #18122a;
  overflow-x: hidden;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  width: 100%;
  height: 56px;
`;

const NavGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 279px;
  height: 56px;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  padding: 0 8px;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 20px;
  color: #e0e0e0;
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 12px;
  white-space: nowrap;
  transition: all 0.3s;

  &.feedback-link {
    background: linear-gradient(135deg, #2973ff 0%, #932eff 100%);
    color: white;
    font-weight: 600;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const MobileFeedbackButton = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  width: 58px;
  height: 56px;
  gap: 2px;

  background: linear-gradient(96.24deg, #2973ff 5.86%, #932eff 77.64%);
  border-radius: 14px;

  @media (min-width: 768px) {
    display: none;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
