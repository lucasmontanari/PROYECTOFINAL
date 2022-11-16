import DAOFactory from "../daos/selectorDeDaos.js";
const factory = new DAOFactory();
const persistencia = process.argv[2] || "MONGO";
const mensajesService = factory.createDAOMensajes(persistencia);

const getMensajes = async (userEmail) => {
  const mensajesEnviar = await mensajesService.getAll();
  return mensajesEnviar;
};

const postMensajes = async (mensaje) => {
  const mensajesEnviar = await mensajesService.save(mensaje);
  return mensajesEnviar;
};

const getMensajesByEmailService = async (userEmail) => {
  const mensajesEnviar = await mensajesService.getMensajesByEmail(userEmail);
  return mensajesEnviar;
};

export { getMensajes, postMensajes, getMensajesByEmailService };