import fotoPortada from "/portada.jpeg";

interface HeaderProps {
  title: string;
}
const HeaderPage: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="relative font-sans">
      <div className="absolute inset-0 bg-opacity -10 backdrop-blur-sm bg-gradient-to-tl from-blueblack-main/10 from-10% via-blueblack-main/10 via-65% to-redmain-800 to-100%"></div>

      <img
        src={fotoPortada}
        alt="Header Image"
        className="w-full h-56 object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
        {title}
      </h1>
    </header>
  );
};

export default HeaderPage;
