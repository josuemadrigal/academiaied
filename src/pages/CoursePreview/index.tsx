import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PdfViewer from "../../components/PdfViewer";

type Course = {
  id: number;
  title: string;
  shortDescription: string;
  image: string;
  details: string;
  category: string;
  duration: string;
  pdfUrl: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Asesor Migratorio",
    shortDescription:
      "Este programa está creado para capacitar al Asesor para la aplicación de la Gestión Migratoria",
    image: "/diplomados/asesor_migratorio.jpeg",
    details:
      "El Diplomado en derecho migratorio y consular de AIED no solo proporciona conocimientos técnicos y habilidades prácticas específicas, sino que también prepara a los individuos para desempeñar un papel crucial en la obtención de una Visa, la gestión eficiente de los tramites migratorios y la promoción de la cooperación internacional en asuntos consulares. AIED ha logrado prestigio y reconocimiento de miles de egresados Capacitándolo para que sean asesores migratorio y consular adaptados al mondo de hoy.",
    category: "Diplomado",
    duration: "8 semanas",
    pdfUrl: "/diplomados/asesor_migratorio.pdf",
  },
  {
    id: 2,
    title: "Derecho de Familia",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
  {
    id: 3,
    title: "Derecho Laboral y Seguridad Social",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
  {
    id: 4,
    title: "Derecho Civil y Procedimiento Civil",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
  {
    id: 5,
    title: "Psicología Clínica",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
  {
    id: 6,
    title: "Terapia Familiar",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
  {
    id: 7,
    title: "Inteligencia Emocional",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
  {
    id: 8,
    title: "Administración Empresarial",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
  {
    id: 9,
    title: "Gestión del Talento Humano",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
  {
    id: 10,
    title: "Neuromarketing",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
  {
    id: 11,
    title: "Comunicación y Marketing Digital",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
  {
    id: 12,
    title: "Creatividad Publicitaria",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
  {
    id: 13,
    title: "Inteligencia Artificial",
    shortDescription: "",
    image: "/aied.educacion.jpeg",
    details: "",
    category: "Diplomado",
    duration: "",
    pdfUrl: "",
  },
];
const CoursePreview: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [visibleCourses, setVisibleCourses] = useState(4);

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCourse]);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleLoadMore = () => {
    setVisibleCourses((prevVisibleCourses) => prevVisibleCourses + 4);
  };

  const categories = [
    "Todos",
    ...new Set(courses.map((course) => course.category)),
  ];

  const filteredCourses =
    selectedCategory === "Todos"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const visibleFilteredCourses = filteredCourses.slice(0, visibleCourses);
  const hasMoreCourses = visibleCourses < filteredCourses.length;

  return (
    <div
      className="flex flex-col items-center p-4 max-w-6xl my-14 mx-auto"
      id="ofertas"
    >
      <h2 className="text-2xl font-bold text-bluemain-950 mb-16">
        Oferta Académica
      </h2>

      <div className="mb-8 flex w-full justify-end">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="py-2 pr-10 border border-gray-300 rounded-md "
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {visibleFilteredCourses.map((course) => (
          <motion.div
            key={course.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCourseClick(course)}
          >
            <div className="absolute top-0 right-0 bg-red-600 text-white text-sm px-2 py-1 rounded-bl-lg z-10">
              {course.category}
            </div>
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.shortDescription}</p>
              <p className="text-sm font-bold text-gray-600">
                Duración: {course.duration}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {hasMoreCourses && (
        <button
          className="mt-10 py-2 px-4 bg-bluemain-950 text-white rounded-lg hover:bg-blueblack-main"
          onClick={handleLoadMore}
        >
          Mostrar más
        </button>
      )}

      {selectedCourse && (
        <motion.div
          className="fixed h-screen w-screen inset-0 z-50 bg-slate-900/95 backdrop-blur-sm bg-opacity-100 flex items-center justify-center "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            className="bg-white rounded-lg p-14 w-4/5 h-[95vh] my-3 mx-auto overflow-scroll"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">{selectedCourse.title}</h3>
            <p className="text-sm text-justify mb-4">
              {selectedCourse.details}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Categoría:</strong> {selectedCourse.category}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Duración:</strong> {selectedCourse.duration}
            </p>

            {selectedCourse.pdfUrl && (
              <>
                <h3 className="text-lg font-bold mt-14">Contenido</h3>
                <div className="py-14">
                  <PdfViewer
                    url={selectedCourse?.pdfUrl}
                    width="100%"
                    height="700px"
                  />
                </div>
              </>
            )}

            <button
              className="mt-4 py-2 px-4 bg-redmain-700 text-white rounded hover:bg-redmain-800"
              onClick={() => setSelectedCourse(null)}
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CoursePreview;
