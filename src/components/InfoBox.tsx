import styled from "styled-components";
const InfoBox = () => {
  return (
    <>
      <Infobox>
        <p>Site in production</p>
      </Infobox>
    </>
  );
};

export default InfoBox;

const Infobox = styled.div`
  font-size: 18px;
  font-weight: bold;
  border: 3px solid #439cfb;
  padding: 15px;
  border-radius: 15px;
  width: fit-content;
  color: #439cfb;
  position: fixed;
  right: 3px;
  top: 80px;
  transition: 0.3s;
  box-sizing: border-box;
  &:hover {
    margin-right: 10px;
    transition: 0.3s;
  }
`;
