import "dotenv/config";
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
  SESSION_TIME,
} = process.env;
import express from "express";
import { Server } from "socket.io";
import rutas from "./routes/rutas.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cluster from "cluster";
import os from "os";
const cpus = os.cpus();
const app = express();
const puerto = PUERTO || 8080;
const modo = MODO;

import { getMensajes, postMensajes } from "./services/mensajes.service.js";

let io

//EJS
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "./public"));
app.set("view engine", "ejs");

//BASE DE DATOS
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
let DbUrl = ""
if(ENTORNO == "prod"){
  DbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST_CLOUD}/${DB_NAME}?retryWrites=true&w=majority`
}
if(ENTORNO == "dev"){
  DbUrl = `mongodb://${DB_HOST_LOCAL}/${DB_NAME}`
}
mongoose.connect(
  DbUrl
);
logger.info("Conexion establecida");

//PASSPORT
import { passportSetup } from "./middleware/passport.js";

import session from "express-session";
import passport from "passport";

passportSetup(passport);
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DbUrl,
      mongoOptions,
    }),
    secret: SESSION_SECRET,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: Number(SESSION_TIME),
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//LOGGER
import logger from "./logger/logger.js";

//CLUSTER
if (modo == "CLUSTER" && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork();
  });

  cluster.on("exit", (worker) => {
    logger.info(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.use("/api/", express.static(`${__dirname}/public`));

  app.use("/", rutas);

  const expressServer = app.listen(puerto, (err) => {
    if (err) {
      logger.error(`Se produjo un error al iniciar el servidor ${err}`);
    } else {
      logger.info(`El servidor esta escuchando el puerto ${puerto}`);
    }
  });

  //WEB SOCKET
  let mensajesEnBaseDeDatos = [];
  io = new Server(expressServer);
  io.on("connection", async (socket) => {
    console.log(`Se conecto un usuario ${socket.id}`);
    try {
      mensajesEnBaseDeDatos = await getMensajes();
      socket.emit("server:mensajes", mensajesEnBaseDeDatos);
    } catch (error) {
      console.log(`Error al adquirir los mensajes ${error}`);
    }
    socket.on("cliente:mensaje", async (nuevoMensaje) => {
      await postMensajes(nuevoMensaje);
      mensajesEnBaseDeDatos = await getMensajes();
      io.emit("server:mensajes", mensajesEnBaseDeDatos);
    });
  });
}
export default io