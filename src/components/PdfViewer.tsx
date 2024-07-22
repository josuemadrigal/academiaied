import React, { useState, useEffect, useRef } from "react";

interface PdfViewerProps {
  url: string;
  width?: string;
  height?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  url,
  width = "100%",
  height = "700px",
}) => {
  const [isSafari, setIsSafari] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pdfViewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detectar si el navegador es Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(isSafari);

    // Listener para cambios en el estado de pantalla completa
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
    };
  }, []);

  const handleLoadError = () => {
    setLoadError(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      pdfViewerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const DownloadButton = () => (
    <div
      className={`flex flex-col items-center justify-center h-60 `}
      style={{ width }}
    >
      <p className="text-lg mb-4">
        {isSafari
          ? "Safari no puede mostrar este PDF directamente."
          : "No se pudo cargar el PDF."}
      </p>
      <a
        href={url}
        download
        className="bg-redmain-900 hover:bg-redmain-950 text-white font-bold py-2 px-4 rounded"
      >
        Descargar PDF
      </a>
    </div>
  );

  if (isSafari || loadError) {
    return <DownloadButton />;
  }

  return (
    <div
      className={`pdf-viewer relative h-60 md:h-[${height}]`}
      style={{ width }}
      ref={pdfViewerRef}
    >
      <object
        data={url}
        type="application/pdf"
        width="100%"
        height="100%"
        onError={handleLoadError}
      >
        <embed src={url} type="application/pdf" />
      </object>
      <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 bg-redmain-900 hover:bg-redmain-950 text-white font-bold py-1 px-2 rounded"
      >
        {isFullscreen ? "Salir de Pantalla Completa" : "Pantalla Completa"}
      </button>
    </div>
  );
};

export default PdfViewer;
