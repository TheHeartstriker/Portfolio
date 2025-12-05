"use client";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
function FadeSettings({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
FadeSettings.propTypes = {
  children: PropTypes.node.isRequired,
};
export default FadeSettings;
