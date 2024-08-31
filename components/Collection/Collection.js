import styled from "styled-components";
import CorrectCounter from "../CorrectCounter/CorrectCounter";

export default function Collection({ name, color, actionMode }) {
  //color sollte später auch dynamisch eingefügt werden (gehört zu bestimmter collection)
  return (
    <CollectionBox $color={color}>
      <CollectionName>{name}</CollectionName>
      <IconWrapper>
        <CorrectCounter variant="incorrect" actionMode={actionMode} />
        <CorrectCounter variant="correct" actionMode={actionMode} />
      </IconWrapper>
    </CollectionBox>
  );
}

const CollectionBox = styled.section`
  margin: 0 auto;
  width: 20rem;
  height: 13rem;
  position: relative;
  border-radius: 10px;
  border: 2px solid ${({ $color }) => $color};
  padding: 10px;
  background-color: #fff;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 2px solid ${({ $color }) => $color};
    z-index: -1;
  }

  &::after {
    top: 10px;
    right: 10px;
    background-color: #ddd;
  }

  &::before {
    top: 19px;
    left: 10px;
    background-color: #bbb;
  }
`;

const CollectionName = styled.h2`
  padding-top: 50px;
  text-align: center;
`;

const IconWrapper = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
`;
