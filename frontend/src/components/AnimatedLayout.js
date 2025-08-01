import React from "react";
import { motion } from "framer-motion";
import FadeIn from "./animations/FadeIn";

// Variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default function AnimatedLayout({ children }) {
  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen"
    >
      {/* Page content wrapped with animation */}
      {children}
    </motion.main>
  );
}
