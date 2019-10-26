import React from "react";
import { motion } from "framer-motion";

const FadePresence: React.FC = function FadePresence({ children }) {
  return (
    <motion.div
      transition={{
        opacity: {
          type: "spring",
          stiffness: 100,
          damping: 4000
        }
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      initial={{
        opacity: 0
      }}
    >
      {children}
    </motion.div>
  );
};

export { FadePresence };
