import { motion } from "framer-motion";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";
import styled from "styled-components";

export default function BubbleAnimation({ swipeDirection }) {
  if (!swipeDirection) return null;

  return (
    <>
      <SwipeIconContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.0, 0.7, 0.5, 0],
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        direction={swipeDirection}
      >
        {swipeDirection === "left" && (
          <MarkAsIncorrect style={{ color: "#fff" }} />
        )}
        {swipeDirection === "right" && (
          <MarkAsCorrect style={{ color: "#fff" }} />
        )}
      </SwipeIconContainer>
    </>
  );
}

const SwipeIconContainer = styled(motion.div)`
  position: absolute;
  top: -65px;
  left: ${({ direction }) => (direction === "left" ? "2%" : "auto")};
  right: ${({ direction }) => (direction === "right" ? "2%" : "auto")};
  background-color: ${({ direction }) =>
    direction === "left" ? "var(--primary-red)" : "var(--primary-green)"};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 7.5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;
