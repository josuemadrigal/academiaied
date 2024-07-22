import React from "react";

const InstitutionInfo: React.FC = () => {
  return (
    <section className="bg-blueblack-main text-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-bluemain-50 mb-4">
          ¿Quienes somos?
        </h2>
        <p className="text-lg leading-7">
          Institución de prestigio internacional que brinda programas de
          educación a distancia, con metodología de aprendizaje{" "}
          <strong>''Learning by Doing o Aprender Haciendo''</strong> en un
          ambiente innovador, accesible, confiable y con los mejores resultados
          de aprendizaje online.
        </p>
      </div>
    </section>
  );
};

export default InstitutionInfo;
