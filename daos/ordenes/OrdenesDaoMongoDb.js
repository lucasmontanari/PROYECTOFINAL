import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import mongoose from "mongoose";
let instance = null

export default class ContenedorOrdenesMongoDb extends ContenedorMongoDb {
  constructor() {
    const carritoScherma = new mongoose.Schema(
      {
        email: { type: String},
        productos: { type: Array },
        numeroOrden: { type: Number },
        estado: { type: String}
      },
      { timestamps: true }
    );

    super("ordenes", carritoScherma);
  }

  async getOrdenesByEmail(userEmail) {
    const ordenes = await this.col.find({ email: userEmail });
    return ordenes;
  }

  static getInstance() {
    if (!instance) {
      instance = new ContenedorOrdenesMongoDb();
    }
    return instance;
  }
}
