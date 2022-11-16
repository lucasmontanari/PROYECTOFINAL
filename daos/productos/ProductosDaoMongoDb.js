import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import mongoose from "mongoose";
let instance = null;

export default class ContenedorProductoMongoDb extends ContenedorMongoDb {
  constructor() {
    const productoScherma = new mongoose.Schema(
      {
        nombre: { type: String },
        descripcion: { type: String },
        codigo: { type: Number, unique: true },
        foto: { type: String },
        precio: { type: Number },
        categoria: { type: String },
        stock: { type: Boolean },
        time_stamp: { type: Number },
      },
      { timestamps: true }
    );

    super("productos", productoScherma);
  }

  async getProductosByCategoria(cat) {
    try {
      const productosByCategoria = await this.col.find({ categoria: cat });
      return productosByCategoria;
    } catch (err) {
      return `${this.colNombre} no encontrado`;
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new ContenedorProductoMongoDb();
    }
    return instance;
  }
}
