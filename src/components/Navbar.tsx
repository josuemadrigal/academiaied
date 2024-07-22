import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

// Hook personalizado para manejar la intersección
const useIntersectionObserver = (elementIds: string[], threshold = 0.7) => {
  const [activeSections, setActiveSections] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const updatedSections: Record<string, boolean> = {};
      entries.forEach((entry) => {
        updatedSections[entry.target.id] = entry.isIntersecting;
      });
      setActiveSections((prev) => ({ ...prev, ...updatedSections }));
    };

    const observerOptions = {
      threshold,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    elementIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [elementIds, threshold]);

  return { activeSections, setActiveSections };
};

const navigation = [
  { name: "Inicio", href: "inicio" },
  {
    name: "Oferta Académica",
    href: "ofertas",
    subMenu: [
      { name: "Diplomados", href: "ofertas" },
      { name: "Talleres", href: "ofertas" },
    ],
  },
  { name: "Contactos", href: "/contactos" },
];

type MobileNavMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  handleNavClick: (targetId: string) => void;
  activeSections: Record<string, boolean>;
};

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  isOpen,
  onClose,
  handleNavClick,
  activeSections,
}) => {
  return (
    <motion.div
      className={`fixed inset-0 bg-stone-50 z-50 transform p-6 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">AIED</span>
          <img className="h-8 w-auto" src="/logo-aied.png" alt="" />
        </a>

        <button
          type="button"
          className="-m-2.5 rounded-md p-2.5 text-gray-700"
          onClick={onClose}
        >
          <span className="sr-only">Cerrar menú</span>
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="py-6">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
              activeSections[item.href]
                ? "text-redmain-500"
                : "text-gray-900 hover:bg-gray-50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              onClose();
              handleNavClick(item.href);
            }}
          >
            {item.name}
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { activeSections, setActiveSections } = useIntersectionObserver(
    navigation.map((item) => item.href)
  );

  const handleNavClick = (targetId: string) => {
    if (targetId.startsWith("/")) {
      navigate(targetId);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY >= 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Cuando la ruta cambia, actualiza las secciones activas
    const currentPath = location.pathname.replace("/", "");
    const updatedSections: Record<string, boolean> = {};
    navigation.forEach((item) => {
      if (item.href === currentPath) {
        updatedSections[item.href] = true;
      } else {
        updatedSections[item.href] = false;
      }
    });
    setActiveSections(updatedSections);
  }, [location.pathname, setActiveSections]);

  return (
    <div className={`fixed z-50 w-full font-sans`}>
      <nav
        className={`flex items-center h-16 justify-between p-2 will-change-scroll bg-scroll lg:px-8 transition-all duration-700 ${
          scrolling ? "bg-blueblack-main/95 backdrop-blur-md" : "bg-transparent"
        }`}
        aria-label="Global"
      >
        <div className={`flex lg:flex-1`}>
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">AIED</span>
            <img
              className={`h-10 ml-10 w-auto ${
                scrolling
                  ? "flex"
                  : location.pathname === "/"
                  ? "hidden"
                  : "flex"
              }`}
              src="/logo-aied-white.png"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <FiMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <a
                href={item.href}
                className={`text-sm leading-6 ${
                  activeSections[item.href]
                    ? "text-redmain-500 font-bold"
                    : "text-slate-100 hover:text-bluemain-50 font-light active:text-bluemain-50"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.name}
              </a>
              {item.subMenu && (
                <div className="absolute top-full w-52 p-1 bg-blueblack-main rounded-md py-2 hidden group-hover:block">
                  {item.subMenu.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-3 py-2 w- text-sm font-semibold rounded-md leading-6 text-gray-100 hover:bg-bluemain-950 hover:text-bluemain-50"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(subItem.href);
                      }}
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/aied.educacion/"
              target="_blank"
              className="text-slate-100 hover:text-slate-100"
            >
              <FaInstagram className="h-4 w-4" />
            </a>
            <a
              href="https://web.facebook.com/profile.php?id=61561466234022"
              target="_blank"
              className="text-slate-100 hover:text-slate-100"
            >
              <FaFacebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-stone-50 z-50">
          <MobileNavMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            handleNavClick={handleNavClick}
            activeSections={activeSections}
          />
        </div>
      )}
    </div>
  );
}
