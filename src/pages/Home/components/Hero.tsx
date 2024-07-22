import { motion } from "framer-motion";
import { RxDoubleArrowDown } from "react-icons/rx";
import fotoPortada from "/portada.jpeg";

const Hero = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const nextSection = document.getElementById("contacto");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden z-40 bg-blueblack-main"
      id="inicio"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0 }}
      >
        <motion.img
          src={fotoPortada}
          alt="Portada"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-md bg-gradient-to-tl from-blueblack-main from-10% via-blueblack-main/60 via-65% to-redmain-800 to-100%"></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div className="flex flex-row md:flex-row items-center gap-4 md:gap-10">
          <motion.img
            src="/logo-aied-white.png"
            alt="Logo AIED"
            className="w-14 md:w-20 h-auto -mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />

          <motion.div
            className="block bg-white w-1 h-full rounded-full "
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

        <motion.a
          href="#"
          onClick={handleClick}
          className="absolute bottom-20 md:bottom-28 left-1/2 transform -translate-x-1/2 cursor-pointer z-50"
          aria-label="Scroll to next section"
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="bg-white/5 rounded-full p-2"
          >
            <RxDoubleArrowDown className="text-xl text-white opacity-90 hover:opacity-100 transition-opacity z-50" />
          </motion.div>
        </motion.a>
      </div>
    </div>
  );
};

export default Hero;
