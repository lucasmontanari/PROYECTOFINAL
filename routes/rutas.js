const {
  ENTORNO,
  PUERTO,
  DB_USER,
  DB_PASSWORD,
  DB_HOST_LOCAL,
  DB_HOST_CLOUD,
  DB_NAME,
  SESSION_SECRET,
  MODO,
  MAIL,
  PASSW,
  TWILIOSID,
  TWILIOTOKEN,
  TWILIOPHONE,
  TWILIOWPP,
  MYPHONE,
  SESSION_TIME,
} = process.env;
let DbUrl = ""
if (ENTORNO == "prod") {
  DbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST_CLOUD}/${DB_NAME}?retryWrites=true&w=majority`;
}
if (ENTORNO == "dev") {
  DbUrl = `mongodb://${DB_HOST_LOCAL}/${DB_NAME}`;
}
import { Router } from "express";
import logger from "../logger/logger.js";
import productosRouter from "./productos.rutas.js";
import carritoRouter from "./carrito.rutas.js";
import usuarioRouter from "./usuario.rutas.js";
import chatRoter from "./mensajes.rutas.js";
import ordenesRouter from "./ordenes.rutas.js";
import serverResponse from "../utils/serverResponse.js";
const router = Router();


//RUTAS
router.get("/", (req, res) => {
  res.redirect("/api/productos");
});
router.use("/api/chat", chatRoter);
router.use("/api/productos", productosRouter);
router.use("/api/carrito", carritoRouter);
router.use("/api/ordenes", ordenesRouter);
router.use("/api/", usuarioRouter);
router.use("/api/config", function (req, res) {
  const response = new serverResponse(
    {
      entorno: ENTORNO,
      UrlDb: DbUrl,
      puerto: PUERTO,
      serverEmail: MAIL,
      sessionTime: SESSION_TIME,
    },
    "Success"
  );
  res.status(200).render("config", response);
});

//FAIL ROUTE
router.get("*", function (req, res) {
  res.status(404).render("routing-error", {
    error: -2,
    descripcion: `ruta '${req.path}' metodo '${req.method}' no implementada`,
  });
  logger.warn("Acceso a Ruta no Definida");
});

export default router;
