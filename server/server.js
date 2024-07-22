const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Habilita el intercambio de cookies a través de las solicitudes hcpk zflh fkng xykb
  })
);

// Configuración de nodemailer (ajusta esto con tus propios datos)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: process.env.EMAIL_USER || "josuemadrigal12@gmail.com",
    // pass: process.env.EMAIL_PASS || "sean ygkb eoet sopp",
    user: process.env.EMAIL_USER || "aied.educacion@gmail.com",
    pass: process.env.EMAIL_PASS || "hcpk zflh fkng xykb",
  },
});

app.post("/enviar-mensaje", async (req, res) => {
  const { name, email, mensaje } = req.body;

  try {
    // Enviar mensaje al correo
    await transporter.sendMail({
      from: email,
      to: "aied.educacion@gmail.com, josuemadrigal12@gmail.com",
      subject: "Nuevo mensaje recibido desde la WEB",
      text: `Mensaje de ${name} - (${email}): ${mensaje}`,
    });

    // Enviar correo de confirmación al remitente
    await transporter.sendMail({
      from: "aied.educacion@gmail.com",
      to: email,
      subject: "Mensaje enviado con éxito",
      text: `Hola ${name}, Tu mensaje ha sido enviado con éxito.`,
    });

    res.status(200).json({ message: "Mensaje enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
});

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send("<h1>Servidor Activo</h1>");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
