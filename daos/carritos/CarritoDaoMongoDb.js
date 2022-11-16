import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import mongoose from "mongoose";
let instance = null

export default class ContenedorCarritoMongoDb extends ContenedorMongoDb {
  constructor() {
    const carritoScherma = new mongoose.Schema(
      {
        email: { type: String},
        productos: { type: Array },
        direccion: { type: String}
      },
      { timestamps: true }
    );

    super("carritos", carritoScherma);
  }

  async saveProductoInCarrito(id, productos) {
    const productosEnDb = await productos.getAll();
    function findID(objeto) {
      //Funcion para encontrar el objeto con el Id buscado
      const idProd = objeto._id.toString()
      return idProd === id;
    }
    let productoAgregado = productosEnDb.find(findID);
    const carritoActual = await this.col
      .find()
      .sort({ createdAt: -1 })
      .limit(1);
    const productoInCarrito = carritoActual[0].productos.find(findID)
    if(productoInCarrito){
      const index = carritoActual[0].productos.indexOf(productoInCarrito)
      carritoActual[0].productos[index].cantidad = carritoActual[0].productos[index].cantidad + 1
    }else{
      productoAgregado = productoAgregado.toObject()
      productoAgregado.cantidad = 1
      carritoActual[0].productos.push(productoAgregado);
    }
    const updatedCarrito = await this.col.replaceOne(
      { _id: carritoActual[0]._id },
      carritoActual[0]
    );
    if (updatedCarrito.n == 0) {
      return `${this.colNombre} no encontrado`;
    }
    return `${this.colNombre} actualizado`;
  }

  async getProductosById(id) {
    const carritoActual = await this.col.find({ _id: id });
    return carritoActual[0].productos;
  }

  async deleteProductoInCarrito(idCarrito, idProducto) {
    const carritoActual = await this.col.find({ _id: idCarrito });
    const productosEnCarrito = carritoActual[0].productos;
    let arregloFiltrado = productosEnCarrito.filter(
      (objeto) => objeto._id != idProducto
    );
    carritoActual[0].productos = arregloFiltrado;
    const updatedCarrito = await this.col.replaceOne(
      { _id: carritoActual[0]._id },
      carritoActual[0]
    );
    if (updatedCarrito.n == 0) {
      return `${this.colNombre} no encontrado`;
    }
    return `Producto eliminado de Carrito`;
  }

  static getInstance() {
    if (!instance) {
      instance = new ContenedorCarritoMongoDb();
    }
    return instance;
  }
}
