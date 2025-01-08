import { motion } from "framer-motion";
import { WrenchIcon, ClockIcon } from "lucide-react";

const MaintenanceHero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden z-40 bg-slate-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-tl from-slate-900 from-10% via-slate-800/60 via-65% to-red-900 to-100%"></div>
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Logo y título institucional */}
        <div className="flex flex-row items-center gap-4 md:gap-10 mb-16">
          <motion.img
            src="/logo-aied-white.png"
            alt="Logo AIED"
            className="w-14 md:w-20 h-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />

          <motion.div
            className="block bg-white w-1 h-16 rounded-full"
            initial={{ opacity: 0, scale: 0.9, x: 400 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          ></motion.div>

          <motion.div
            className="text-center uppercase"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.9 }}
          >
            <div className="text-white font-minion flex flex-col items-start font-bold">
              <span className="text-xl md:text-4xl">Academia</span>
              <span className="text-xl md:text-4xl">Iberoamericana</span>
              <span className="text-xl md:text-4xl">
                De Educación A Distancia
              </span>
            </div>
          </motion.div>
        </div>

        {/* Contenido de mantenimiento */}
        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="bg-white/10 p-6 rounded-full"
          >
            <WrenchIcon className="w-16 h-16 text-white" />
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.1 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Estamos en Mantenimiento
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Estamos trabajando para mejorar tu experiencia. Volveremos pronto.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full"
          >
            <ClockIcon className="w-5 h-5 text-white" />
            <span className="text-white">Tiempo estimado: 72 horas</span>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-0 right-0 text-center text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-sm">
            Para más información, contacta con info@academiaied.com
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MaintenanceHero;
