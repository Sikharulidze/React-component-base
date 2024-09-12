import styled, { keyframes } from "styled-components";

const Feedback = () => {
  return (
    <Main>
      <Container>
        <AnimatedSpan>Your experience matters to us!</AnimatedSpan>
      </Container>
      <Description>
        We’re constantly striving to improve and provide the best tools and
        resources for our users. If you have any suggestions, feedback, or ideas
        for new features, we’d love to hear from you. Your input helps us make
        our site even better and ensures that we meet your needs effectively.
        Please reach out to us with your thoughts and let us know how we can
        enhance your experience. Thank you for being a part of our community!
      </Description>
      <Form>
        <StyledInput type="text" placeholder="Email" />
        <StyledTextarea placeholder="I think ..."></StyledTextarea>
        <SendBtn type="submit">SEND</SendBtn>
      </Form>
    </Main>
  );
};

export default Feedback;

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  padding-bottom: 50px;
`;

const animTextFlowKeys = keyframes`
  0% { color: hsla(0, 60%, 60%, 1); }
  5% { color: hsla(30, 60%, 60%, 1); }
  10% { color: hsla(60, 60%, 60%, 1); }
  15% { color: hsla(90, 60%, 60%, 1); }
  20% { color: hsla(120, 60%, 60%, 1); }
  25% { color: hsla(150, 60%, 60%, 1); }
  30% { color: hsla(180, 60%, 60%, 1); }
  35% { color: hsla(210, 60%, 60%, 1); }
  40% { color: hsla(240, 60%, 60%, 1); }
  45% { color: hsla(270, 60%, 60%, 1); }
  50% { color: hsla(300, 60%, 60%, 1); }
  55% { color: hsla(330, 60%, 60%, 1); }
  60% { color: hsla(360, 60%, 60%, 1); }
  65% { color: hsla(30, 60%, 60%, 1); }
  70% { color: hsla(60, 60%, 60%, 1); }
  75% { color: hsla(90, 60%, 60%, 1); }
  80% { color: hsla(120, 60%, 60%, 1); }
  85% { color: hsla(150, 60%, 60%, 1); }
  90% { color: hsla(180, 60%, 60%, 1); }
  95% { color: hsla(210, 60%, 60%, 1); }
  100% { color: hsla(240, 60%, 60%, 1); }
`;

const AnimatedSpan = styled.span`
  display: inline-block;
  animation: ${animTextFlowKeys} 5s infinite alternate;
  animation-fill-mode: forwards;
  font-size: 28px;
  font-weight: bold;
`;

const Container = styled.div`
  color: #fefefe;
  font-family: "Ubuntu", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  line-height: 2;
  font-weight: 300;
  text-rendering: optimizeLegibility;
  text-align: center;
  padding: 2rem;
  width: 80%;
`;

const Description = styled.p`
  width: 80%;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  margin-top: 15px;
  @media (min-width: 768px) {
    width: 50%;
    margin-top: 30px;
  }
`;

const StyledInput = styled.input`
  font-family: "Rubik", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 16px;
  box-sizing: border-box;
  outline: none;
  resize: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  border: 1px solid gray;
  border-radius: 12px;
  &::placeholder {
    color: gray;
  }
`;

const StyledTextarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
  margin-top: 10px;
  font-family: "Rubik", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 16px;
  box-sizing: border-box;
  outline: none;
  resize: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  border: 1px solid gray;
  border-radius: 12px;
  &::placeholder {
    color: gray;
  }
  @media (min-width: 768px) {
    margin-top: 15px;
  }
`;

const SendBtn = styled.button`
  padding: 5px 10px;
  flex-shrink: 0;
  color: white;
  font-family: "Rubik", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background-color: #4d56d1;
  border-radius: 5px;
  margin-top: 15px;
  border: none;
  cursor: pointer;
  margin-left: auto;
  @media (min-width: 768px) {
    padding: 10px 20px;
    margin-top: 30px;
  }
`;
