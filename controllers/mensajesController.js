import { getMensajes, postMensajes, getMensajesByEmailService } from "../services/mensajes.service.js";
import OrdenesDTO from "../dtos/OrdenesDTO.js";
import serverResponse from "../utils/serverResponse.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const getMensajesByEmail = async (req, res) => {
  const userEmail = req.params.email;
  let mensajes = await getMensajesByEmailService(userEmail);
  let response = new serverResponse(mensajes, "Success");
  res.status(201).render("chat.ejs", response);
  //res.status(201).json(response);
};

export { getMensajesByEmail };