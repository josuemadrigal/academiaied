import Hero from "./components/Hero";
import { motion } from "framer-motion";
import CoursePreview from "../CoursePreview";
import InstitutionInfo from "./components/InstitutionInfo";
import PorQueEstudiarConNosotros from "./components/PorQueEstudiarConNosotros";
import CTAcontacts from "../../components/CTAcontacts";

const Home = () => {
  return (
    <div className="font-sans bg-willow-grove-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <InstitutionInfo />
        <CoursePreview />
        {/* <FormularioContacto /> */}
        <PorQueEstudiarConNosotros />
        <CTAcontacts />
      </motion.div>
    </div>
  );
};

export default Home;
