import React, { useState } from "react";
import { FaEnvelope, FaUser, FaAt, FaPhoneAlt } from "react-icons/fa";

interface FormErrors {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

export const FormularioContacto: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errores, setErrores] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const validarFormulario = (): boolean => {
    const nuevosErrores: FormErrors = {};
    if (!formData.nombre.trim())
      nuevosErrores.nombre = "El nombre es requerido";
    if (!formData.email.trim()) nuevosErrores.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      nuevosErrores.email = "Email inválido";
    if (!formData.mensaje.trim())
      nuevosErrores.mensaje = "El mensaje es requerido";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://server.academiaied.com/enviar-mensaje",
          //"http://localhost:3003/enviar-mensaje",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.nombre.split(" ")[0],
              email: formData.email,
              mensaje: formData.mensaje,
            }),
          }
        );

        if (response.ok) {
          setStatus("Mensaje enviado con éxito");
          setFormData({ nombre: "", email: "", mensaje: "" });
        } else {
          setStatus("Error al enviar el mensaje");
        }
      } catch (error) {
        console.error("Error de red", error);
        setStatus("Error al enviar el mensaje");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section
      className="py-20 md:min-h-screen bg-gradient-to-br bg-blue-50"
      id="contactos"
    >
      <div className=" mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-tl  from-blueblack-main from-0% via-blueblack-main via-55% to-redmain-800 to-100% p-12 text-white flex flex-col justify-center">
              <h2 className="text-sm md:text-sm bg-blueblack-main text-white p-0.5 px-4 w-fit rounded-md mb-2">
                Contáctanos
              </h2>
              <p className="text-3xl font-bold mb-8">
                Estamos aquí para responder tus preguntas y ayudarte en tu
                proceso educativo.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaEnvelope className="mr-3" />
                  <span>info@academiaied.com</span>
                </div>
                <div className="flex items-center">
                  <FaPhoneAlt className="mr-3" />
                  <span>+1 (809) 284-6378</span>
                </div>
                <div className="flex items-center">
                  <FaUser className="mr-3" />
                  <span>Lunes a Viernes: 9:00 am - 6:00 pm</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
                      placeholder="Tu nombre completo"
                    />
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {errores.nombre && (
                    <p className="mt-1 text-sm text-red-600">
                      {errores.nombre}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
                      placeholder="tu@email.com"
                    />
                    <FaAt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {errores.email && (
                    <p className="mt-1 text-sm text-red-600">{errores.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bluemain-950 focus:border-bluemain-950"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                  {errores.mensaje && (
                    <p className="mt-1 text-sm text-red-600">
                      {errores.mensaje}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-950 hover:bg-blueblack-main text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    "Enviando..."
                  ) : (
                    <>
                      <FaEnvelope className="mr-2" /> Enviar mensaje
                    </>
                  )}
                </button>
                {status && (
                  <p
                    className={`mt-4 text-center ${
                      status.includes("éxito")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
