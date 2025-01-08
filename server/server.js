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

const pool = mysql.createPool({
  host: "192.34.60.224",
  user: "josue",
  password: "josue4321",
  database: "nombre_de_tu_base_de_datos",
});

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

// Secret key para JWT
const JWT_SECRET = process.env.JWT_SECRET || "tu_clave_secreta_jwt";

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Failed to authenticate token" });
    req.userId = decoded.id;
    next();
  });
};

// Endpoint para signup
app.post("/signup", async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, hashedPassword]
    );
    res.status(201).json({
      message: "Usuario creado exitosamente",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error en signup:", error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
});

// Endpoint para login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Email o contraseña incorrectos" });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email o contraseña incorrectos" });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send("<h1>Servidor Activo</h1>");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
