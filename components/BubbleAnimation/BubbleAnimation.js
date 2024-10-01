import { motion } from "framer-motion";
import MarkAsIncorrect from "@/public/icons/MarkAsIncorrect.svg";
import MarkAsCorrect from "@/public/icons/MarkAsCorrect.svg";

export default function BubbleAnimation({ swipeDirection }) {
  console.log("bubble animation rendered");

  if (!swipeDirection) return null;

  const SwipeIcon = ({ direction }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.0, 0.7, 0.5, 0],
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: "-50px",
        left: direction === "left" ? "7%" : "auto",
        right: direction === "right" ? "7%" : "auto",
        backgroundColor:
          direction === "left" ? "var(--primary-red)" : "var(--primary-green)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 7.5px rgba(0, 0, 0, 0.3)",
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
