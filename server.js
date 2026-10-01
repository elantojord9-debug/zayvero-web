import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import crypto from "crypto";
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
    "Content-Type, X-ZAYVERO-KEY, X-Panel-Token"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ================================
// AUTENTICACIÓN DEL PANEL COMERCIAL
// El panel ya no es público: se accede desde la ruta /panel
// con una contraseña (variable PANEL_PASSWORD en Render).
// El login entrega un token de sesión que el frontend envía
// en el header X-Panel-Token en cada petición al panel.
// ================================
const PANEL_PASSWORD = process.env.PANEL_PASSWORD || "";
const panelTokens = new Set();

app.post("/api/panel/login", (req, res) => {
  const { password } = req.body || {};

  if (!PANEL_PASSWORD) {
    return res.status(500).json({
      ok: false,
      error: "Panel no configurado",
    });
  }

  if (password && password === PANEL_PASSWORD) {
    const token = crypto.randomBytes(32).toString("hex");
    panelTokens.add(token);
    return res.json({ ok: true, token });
  }

  return res.status(401).json({
    ok: false,
    error: "Contraseña incorrecta",
  });
});

function requirePanelAuth(req, res, next) {
  const token = req.headers["x-panel-token"];

  if (token && panelTokens.has(token)) {
    return next();
  }

  return res.status(401).json({
    error: "No autorizado",
  });
}

app.get("/api/panel-comercial", requirePanelAuth, async (req, res) => {
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

app.post("/api/panel/estado", requirePanelAuth, async (req, res) => {
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
