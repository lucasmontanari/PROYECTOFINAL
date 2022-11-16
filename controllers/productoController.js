import {
  getProductosService,
  getProductosByCategoriaService,
  postProductosService,
  editProductosService,
  deleteProductosService,
  productosService,
} from "../services/productos.service.js";
import ProductoDTO from "../dtos/ProductosDTO.js";
import serverResponse from "../utils/serverResponse.js";
import { Admin } from "../config.js";
const productos = productosService;

const getProductos = async (req, resp) => {
  const id = req.params.id;
  try {
    const productosDAO = await getProductosService(id);
    if(String(productosDAO) == "productos no encontrado"){
      resp.status(404).json(new serverResponse(null, productosDAO, true, 404));
    }else{
      const productosEnviar = new ProductoDTO(productosDAO).productos
      let response = new serverResponse(productosEnviar, "Success")
      resp.status(200).render("productos", response);
    }
  } catch (err) {
    resp.status(500).json(new serverResponse(null, err, true, 500))
  }
};

const getProductosByCategoria = async (req, resp) => {
  const categoria = req.params.categoria;
  try {
    const productosDAO = await getProductosByCategoriaService(categoria);
    if(String(productosDAO) == "productos no encontrado"){
      resp.status(404).json(new serverResponse(null, productosDAO, true, 404));
    }else{
      const productosEnviar = new ProductoDTO(productosDAO).productos
      let response = new serverResponse(productosEnviar, "Success")
      resp.status(200).render("productos", response);
    }
  } catch (err) {
    resp.status(500).json(new serverResponse(null, err, true, 500))
  }
};

const postProductos = async (req, resp) => {
  const producto = req.body;
  if (Admin) {
    try {
      const productosEnviar = await postProductosService(producto);
      let response = new serverResponse(productosEnviar, "Success")
      resp.status(201).json(response);
    } catch (err) {
      resp.status(500).json(new serverResponse(null, err, true, 500))
    }
  } else {
    resp.status(401).json(new serverResponse(null, `ruta '${req.path}' metodo '${req.method}' no autorizada`, true, -1));
  }
};

const editProductos = async (req, resp) => {
  const producto = req.body;
  if (Admin) {
    const id = String(req.params.id);
    try {
      const productosEnviar = await editProductosService(producto, id);
      let response = new serverResponse(productosEnviar, "Success")
      resp.status(201).json(response);
    } catch (err) {
      resp.status(500).json(new serverResponse(null, err, true, 500))
    }
  } else {
    resp.status(401).json(new serverResponse(null, `ruta '${req.path}' metodo '${req.method}' no autorizada`, true, -1));
  }
};

const deleteProductos = async (req, resp) => {
  const id = String(req.params.id);
  if (Admin) {
    try {
      const productosEnviar = await deleteProductosService(id);
      let response = new serverResponse(productosEnviar, "Success")
      resp.status(201).json(response);
    } catch (err) {
      resp.status(500).json(new serverResponse(null, err, true, 500))
    }
  } else {
    resp.status(401).json(new serverResponse(null, `ruta '${req.path}' metodo '${req.method}' no autorizada`, true, -1));
  }
};

export {
  getProductos,
  getProductosByCategoria,
  postProductos,
  editProductos,
  deleteProductos,
  productos,
};
