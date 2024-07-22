import React, { useState, useRef, useCallback } from "react";
import { GoScreenFull } from "react-icons/go";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center" ref={containerRef}>
      <div
        className={`relative overflow-hidden bg-gray-100 ${
          isFullscreen ? "w-screen h-screen" : "w-full h-[60vh]"
        }`}
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
      </div>
      <div className="mt-4 md:flex items-center justify-center gap-10 space-y-3 md:space-y-0  ">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-bluemain-950 text-white rounded-md text-sm hover:bg-blueblack-main"
        >
          <FaArrowLeft />
        </button>
        <span
          className={`text-sm w-36 mx-4 ${
            isFullscreen ? "text-white" : "text-blueblack-main"
          }`}
        >
          {currentIndex + 1} de {images.length}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-bluemain-950 text-white rounded-md text-sm hover:bg-blueblack-main"
        >
          <FaArrowRight />
        </button>
        <button
          onClick={toggleFullscreen}
          className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 px-2 rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform  hover:shadow-lg disabled:opacity-500"
        >
          <GoScreenFull className="mr-2" />
          {isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;
