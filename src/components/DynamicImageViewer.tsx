import React, { useEffect, useState } from "react";
import ImageViewer from "./ImageViewer";

type ImageModule = {
  default: string;
};

const DynamicImageViewer: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        console.log("Iniciando carga de imágenes");
        const imageModules = import.meta.glob<ImageModule>(
          "/diplomados/asesor/*.(png|jpg|svg)"
        );
        console.log("Módulos de imágenes:", imageModules);

        const imageUrls: string[] = [];

        for (const path in imageModules) {
          console.log(`Cargando imagen: ${path}`);
          const moduleLoader = imageModules[path];
          const mod = await moduleLoader();
          console.log(`Imagen cargada: ${mod.default}`);
          imageUrls.push(mod.default);
        }

        console.log(`Total de imágenes cargadas: ${imageUrls.length}`);
        setImages(imageUrls);
      } catch (err) {
        console.error("Error al cargar las imágenes:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Error desconocido al cargar las imágenes"
        );
      }
    };

    loadImages();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return images.length > 0 ? (
    <ImageViewer images={images} />
  ) : (
    <div>Cargando imágenes...</div>
  );
};

export default DynamicImageViewer;
