import React from "react";
import styled from "styled-components";

interface ButtonProps {
  className?: string;
  icon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
}

const Button = ({ icon, text, onClick, className }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} className={className}>
      {icon && <span>{icon}</span>}
      {text && <p>{text}</p>}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  width: fit-content;
  display: block;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 30px;
  font-size: var(--font-size-20);
  color: var(--white);
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  transition: all 0.3s ease;
  border: none;
  background: none;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid transparent;
    border-radius: 10px;
    background: linear-gradient(45deg, var(--primary-blue), var(--primary-purple)) border-box;
    -webkit-mask: linear-gradient(var(--white) 0 0) padding-box, linear-gradient(var(--white) 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, var(--primary-blue) 0%, var(--primary-purple) 80%);
    border-radius: 8px;
    z-index: -2;
    transition: all 0.3s ease;
  }

  &:hover::after {
    background: var(--midnight);
  }
  &:active::after {
    background: linear-gradient(45deg, var(--pressed-blue) 0%, var(--pressed-purple) 80%);
  }
  &:active::before {
    background: linear-gradient(45deg, var(--pressed-blue) 0%, var(--pressed-purple) 80%);
  }
  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
}`;