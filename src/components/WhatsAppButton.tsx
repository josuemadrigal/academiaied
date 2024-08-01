import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppButton: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const phoneNumber = "18092846378";
  const message = "Hola, me gustaría obtener más información.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMessage(false);
  };

  return (
    <>
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed z-50 bottom-24 right-6  bg-slate-50 text-gray-800 p-3 rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-center font-sans font-medium">
              <p className="text-sm mr-4">
                🌟 ¿Necesitas ayuda? ¡Escríbenos! 📲
              </p>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-8 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setShowMessage(false)}
        onHoverEnd={() => setShowMessage(true)}
      >
        <FaWhatsapp className="h-6 w-6" />
      </motion.a>
    </>
  );
};
//test
export default WhatsAppButton;
