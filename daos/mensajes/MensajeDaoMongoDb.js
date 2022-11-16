import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import mongoose from "mongoose";
let instance = null

export default class ContenedorMensajeMongoDb extends ContenedorMongoDb {
  constructor() {
    const mensajeScherma = new mongoose.Schema({
      author: { type: Object },
      tiempoStamp: { type: String },
      text: { type: String },
    });

    super("mensajes", mensajeScherma);
  }

  async getMensajesByEmail(userEmail) {
    const mensajes = await this.col.find({ "author.userEmail": userEmail});
    return mensajes;
  }

  static getInstance() {
    if (!instance) {
      instance = new ContenedorMensajeMongoDb();
    }
    return instance;
  }
}
