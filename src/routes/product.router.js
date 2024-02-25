import { Router } from "express";
import * as  productController from "../controllers/ProductController.js";

const router = Router();

// Rutas

// Ruta para obtener todos los productos con filtros y paginación
router.get('/', productController.getProducts);

// Ruta para obtener un producto por su _id
router.get('/:_id', productController.getProductById);

// Ruta para agregar un nuevo producto
router.post('/', productController.addProduct);

// Ruta para actualizar un producto por su ID
router.put('/:id', productController.updateProductById);
// Exportar el router
export default router;
