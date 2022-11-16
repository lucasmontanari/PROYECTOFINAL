import DAOFactory from "../daos/selectorDeDaos.js";
const factory = new DAOFactory
const persistencia =parseInt(process.argv[2]) || 'MONGO'
const usuarioService = factory.createDAOUsuario(persistencia)

const getUsuarioService = async (email) => {
  const usuarioEnviar = await usuarioService.getUsuarioByEmail(email);
  return usuarioEnviar;
};

const postUsuarioService = async (newUser) => {
  const usuario = await usuarioService.save(newUser);
  const usuarioEnviar = await usuarioService.getUsuarioByEmail(newUser.email);
  return usuarioEnviar;
};

const updateUsuario = async (userEmail, id) => {
  const usuarioEnviar = await usuarioService.updateUsuarioByEmail(userEmail,id);
  return usuarioEnviar;
};

const getUsuarioByIDService = async (id,done) => {
  const usuarioEnviar = await usuarioService.getUsuarioByID(id,done);
  return usuarioEnviar;
};

export {
  getUsuarioService,
  postUsuarioService,
  updateUsuario,
  getUsuarioByIDService,
  usuarioService
};
