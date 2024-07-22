import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";

const PorQueEstudiarConNosotros = () => {
  const beneficios = [
    "Metodología innovadora y práctica",
    "Profesores expertos en la industria",
    "Comunidad global de estudiantes",
    "Flexibilidad horaria para tu comodidad",
    "Contenido actualizado y relevante",
  ];

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const formatted = useTransform(rounded, (latest) =>
    latest.toLocaleString("en-US")
  );
  const countRef = React.useRef(null);
  const isInView = useInView(countRef, { once: true });

  React.useEffect(() => {
    if (isInView) {
      const animation = animate(count, 1000, { duration: 3 });
      return animation.stop;
    }
  }, [isInView]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const nextSection = document.getElementById("ofertas");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-10 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            ¿Por qué estudiar con nosotros?
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="h-1 bg-bluemain-main mx-auto rounded-full"
          ></motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={containerVariants} className="space-y-6">
            <motion.h3
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
            >
              Educación de calidad
              <span className="block text-bluemain-950 text-5xl ">
                a tu alcance
              </span>
            </motion.h3>
            <motion.p variants={itemVariants} className="text-lg text-gray-600">
              Ofrecemos una experiencia educativa única, diseñada para
              prepararte para el futuro profesional que deseas en un mundo en
              constante evolución.
            </motion.p>
            <motion.ul variants={containerVariants} className="space-y-4">
              {beneficios.map((beneficio, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-amber-500 mt-1" />
                  </motion.div>
                  <span className="ml-3 text-gray-700">{beneficio}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={itemVariants} className="pt-6">
              <motion.a
                href="#"
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center rounded-lg px-6 py-3 border border-transparent text-base font-medium  shadow-sm text-white bg-redmain-900 hover:bg-redmain-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-redmain-950 transition duration-150 ease-in-out"
              >
                Explora nuestros programas
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="aspect-w-8 aspect-h-8"
            >
              <img
                src="/student.jpeg"
                alt="Estudiantes en clase"
                className="object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute top-4 right-4 bg-white py-2 px-4 rounded-full shadow-lg"
            >
              <span className="text-bluemain-500 text-xs font -bold">
                10% Descuento
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          ref={countRef}
          variants={itemVariants}
          className="my-24 text-center max-w-lg mx-auto"
        >
          <p className="text-2xl md:text-3xl text-gray-600">
            Únete a nuestra comunidad de más de{" "}
            <motion.span className="font-black text-3xl text-bluemain-950">
              {formatted}
            </motion.span>{" "}
            estudiantes satisfechos
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PorQueEstudiarConNosotros;
