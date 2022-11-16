class OrdenesDTO {
  constructor(ordenes, usuario) {
    this.usuario = usuario.nombre;
    this.email = usuario.email;
    this.ordenes = [];
    ordenes.map((orden) => {
      this.ordenes.push({
        productos: orden.productos,
        numeroOrden: orden.numeroOrden,
        fecha: orden.createdAt.toLocaleDateString("es-AR"),
      });
    });
  }
}

export default OrdenesDTO;
