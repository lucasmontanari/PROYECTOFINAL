import { Router } from "express";
import checkAuth from "../middleware/checkLogueo.js";
import { getMensajesByEmail } from '../controllers/mensajesController.js'
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();
import io from "../server.js";

//USUARIOS
router.get('/:email', checkAuth, getMensajesByEmail)
router.get("/", checkAuth, async function (req, res) {
  try {
    io.on("connection", async (socket) => {
      socket.emit("server:usuario", req.user);
    });
  } catch (error) {
    console.log(`Error al adquirir los mensajes ${error}`);
  }
  res.sendFile(path.join(__dirname, "..", "public", "chat.html"));
});

export default router;
