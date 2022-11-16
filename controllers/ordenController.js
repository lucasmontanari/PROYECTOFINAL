import {
  getOrdenesService,
  postOrdenService,
  getOrdenesByEmailService,
} from "../services/ordenes.service.js";
import OrdenesDTO from "../dtos/OrdenesDTO.js";
import serverResponse from "../utils/serverResponse.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const getOrdenes = async (req, res) => {
  let ordenes = await getOrdenesService();
  let response = new serverResponse(ordenes, "Success");
  res.status(201).json(response);
};

const postOrdenes = async (req, res) => {
  const userEmail = req.user.email;
  const existingUser = await getUsuarioService(userEmail);
  let productosInCarr = await getCarritoService(existingUser.carrito);
  productosInCarr = productosInCarr[0].productos;
  postOrdenService(userEmail, productosInCarr);
  let response = new serverResponse("Orden realizada", "Success");
  res.status(201).json(response);
};

const getOrdenesByEmail = async (req, res) => {
  const userEmail = req.user.email;
  const ordenesDAO = await getOrdenesByEmailService(userEmail);
  const ordenesDTO = new OrdenesDTO(ordenesDAO, req.user)
  let response = new serverResponse(ordenesDTO, "Success");
  res.status(201).render("ordenes.ejs", response);
  //res.status(201).json(response);
};

export { getOrdenes, postOrdenes, getOrdenesByEmail };
