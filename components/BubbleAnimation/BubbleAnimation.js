import { motion } from "framer-motion";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";

export default function BubbleAnimation({ swipeDirection }) {
  const SwipeIcon = ({ direction }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        scale: [1, 2, 1.5],
        opacity: [0.5, 1, 0.5, 0],
      }}
      transition={{ duration: 1 }}
      style={{
        position: "absolute",
        top: "50%",
        left: direction === "left" ? "10%" : "auto",
        right: direction === "right" ? "10%" : "auto",
        transform: "translateY(-50%)",
        backgroundColor:
          direction === "left" ? "var(--primary-red)" : "var(--primary-green)",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      {direction === "left" ? (
        <MarkAsIncorrect style={{ color: "white" }} />
      ) : (
        <MarkAsCorrect style={{ color: "white" }} />
      )}
    </motion.div>
  );

  return (
    <>
      {swipeDirection === "right" && <SwipeIcon direction="right" />}
      {swipeDirection === "left" && <SwipeIcon direction="left" />}
    </>
  );
}
