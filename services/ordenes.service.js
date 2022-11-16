import DAOFactory from "../daos/selectorDeDaos.js";
const factory = new DAOFactory();
const persistencia = process.argv[2] || "MONGO";
const ordenesService = factory.createDAOOrdenes(persistencia);

const getOrdenesService = async () => {
  const ordenesEnviar = await ordenesService.getAll();
  return ordenesEnviar;
};

const postOrdenService = async (userEmail, productosInCarrito) => {
  let allOrdenes = await ordenesService.getAll();
  let orden = allOrdenes.length + 1 || 1;
  await ordenesService.save({
    email: userEmail,
    productos: productosInCarrito,
    numeroOrden: orden,
    estado: "generada",
    timestamp: Date.now(),
  });
  let ordenActual = allOrdenes[allOrdenes.length - 1];
  return ordenActual;
};

const getOrdenesByEmailService = async (userEmail) => {
  const ordenesEnviar = await ordenesService.getOrdenesByEmail(userEmail);
  return ordenesEnviar;
};

export { getOrdenesService, postOrdenService, getOrdenesByEmailService };
