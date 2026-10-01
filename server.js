import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, X-ZAYVERO-KEY"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.get("/api/panel-comercial", async (req, res) => {
  console.log("Solicitud recibida desde el frontend");

  try {
    const response = await fetch(process.env.N8N_PANEL_URL, {
      method: "GET",
      headers: {
        "X-ZAYVERO-KEY": process.env.N8N_PANEL_KEY,
      },
    });

    const data = await response.json();

    console.log("Respuesta recibida desde n8n:", response.status);

    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Error conectando con n8n:", error);

    return res.status(500).json({
      error: "No se pudo conectar con el Panel Comercial de ZAYVERO.",
    });
  }
});

// ================================
// ACTUALIZAR ESTADO DEL LEAD
// Recibe { id, estado } desde el panel y lo envía
// al workflow "ZAYVERO - Actualizar Estado" de n8n.
// ================================
const N8N_ESTADO_URL =
  "https://zayvero.app.n8n.cloud/webhook/zayvero-actualizar-estado";

const ESTADOS_VALIDOS = [
  "Nuevo",
  "Contactado",
  "En seguimiento",
  "Demo agendada",
  "Cliente ganado",
  "Cliente perdido",
];

app.post("/api/panel/estado", async (req, res) => {
  console.log("Solicitud de cambio de estado recibida");

  try {
    const { id, estado } = req.body || {};

    if (!id || !ESTADOS_VALIDOS.includes(estado)) {
      return res.status(400).json({
        ok: false,
        error: "Datos no válidos",
      });
    }

    const response = await fetch(N8N_ESTADO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, estado }),
    });

    const data = await response.json();

    console.log("Respuesta de n8n (actualizar estado):", response.status);

    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Error actualizando estado:", error);

    return res.status(500).json({
      ok: false,
      error: "Error del servidor",
    });
  }
});

// ================================
// SERVIR LA PÁGINA (solo en producción)
// Cuando Render construye el proyecto, la página compilada
// queda en la carpeta "dist" y este servidor la muestra.
// En tu PC (desarrollo) esto no hace nada.
// ================================
const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Cualquier ruta que no sea /api/* muestra la página
  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor ZAYVERO activo en puerto ${PORT}`);
});

server.on("error", (error) => {
  console.error("ERROR DEL SERVIDOR:", error);
});

server.on("close", () => {
  console.log("SERVIDOR CERRADO");
});
