import { Router } from "express";
import * as CartController from "../controllers/CartController.js";

const router = Router();

// Endpoint POST para crear un carrito con una lista de productos
router.post('/', CartController.createCart);

// Endpoint DELETE para eliminar todos los productos del carrito
router.delete('/', CartController.removeAllProductsFromCart);

// Endpoint DELETE para eliminar un producto en particular del carrito por su ID
router.delete('/:_id', CartController.removeProductFromCart);

// Endpoint PUT para actualizar la cantidad de un producto en el carrito por su ID
router.put('/:_id', CartController.updateProductQuantity);

// Endpoint para actualizar el carrito con un arreglo de productos
router.put('/cart/:_id', CartController.updateCart);

// Endpoint GET para obtener los productos paginados de un carrito por su ID
router.get('/cart/:cid', CartController.getProductsInCartWithDetails);

// Exportar el router
export default router;
