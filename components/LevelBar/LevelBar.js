import styled from "styled-components";

export default function LevelBar({ level, average }) {
  return (
    <StyledLevelBar>
      <Whitespace $level={level} $average={average}></Whitespace>
    </StyledLevelBar>
  );
}

const StyledLevelBar = styled.div`
  margin: 0 auto;
  width: 90%;
  height: 12px;
  border-radius: 3px;
  background: #f01709;
  background: linear-gradient(90deg, #f01709 0%, #f5f706 55%, #54cd07 100%);
  position: relative;
`;

const Whitespace = styled.div`
  height: 100%;
  background-color: #fff;
  width: ${({ $level, $average }) => {
    switch ($level) {
      case 1:
        return "100%";
      case 2:
        return "75%";
      case 3:
        return "50%";
      case 4:
        return "25%";
      case 5:
        return "0";
      default:
        return `${(5 - $average) * 25}%`;
    }
  }};
  position: absolute;
  right: 0;
  opacity: 0.8;
`;
