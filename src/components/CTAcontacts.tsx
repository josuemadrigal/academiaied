const CTAcontacts = () => {
  return (
    <section className=" bg-gradient-to-tr from-blueblack-main from-30% to-90% to-red-950 ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-white">
            Inicia tu preparación hoy mismo
          </h2>
          <p className="mb-6 font-light text-gray-300 md:text-lg">
            Clases 100% Virtuales en Vivo y te enseñamos desde Cero. Puedes
            estudiar desde cualquier lugar.
          </p>
          <a
            href="/contactos"
            className="text-white bg-redmain-900 hover:bg-redmain-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-redmain-600 dark:hover:bg-redmain-700 focus:outline-none focus:ring-redmain-800"
          >
            Contactanos
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTAcontacts;
