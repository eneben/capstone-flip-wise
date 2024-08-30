import styled from "styled-components";
import MarkAsCorrect from "@/icons/MarkAsCorrect.svg";
import MarkAsIncorrect from "@/icon/MarkAsIncorrect.svg";

export default function Collection({
  name,
  correctCounter,
  incorrectCounter,
  color,
}) {
  return (
    <CollectionWrapper $color={color}>
      <CollectionName>{name}</CollectionName>
      <IconWrapper>
        <IconCounter>
          <Icon>
            <MarkAsIncorrect />
          </Icon>
          <Counter>{incorrectCounter}</Counter>
        </IconCounter>
        <IconCounter>
          <Icon>
            <MarkAsCorrect />
          </Icon>
          <Counter>{correctCounter}</Counter>
        </IconCounter>
      </IconWrapper>
    </CollectionWrapper>
  );
}

const CollectionWrapper = styled.section`
  border: 3px solid ${$color};
`;

const CollectionName = styled.h2``;

const IconWrapper = styled.ul``;

const IconCounter = styled.li``;

const Icon = styled.span``;

const Counter = styled.span``;
