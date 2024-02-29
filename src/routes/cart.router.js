// routes/cart.router.js

import { Router } from 'express';
import * as CartController from '../controllers/CartController.js';
import { passportCall, authorization } from "../dirname.js";

const router = Router();



router.post('/:productId', passportCall('jwt'), authorization(['USUARIO']), CartController.AddProductToCart);

router.delete('/:productId', passportCall('jwt'), authorization(['USUARIO']), CartController.removeProductFromCart);

router.delete('/', passportCall('jwt'), authorization(['USUARIO']), CartController.removeAllProductsFromCart);

router.put('/:_id', CartController.updateProductQuantity);

router.put('/cart/:_id', CartController.updateCart);

router.get('/cart/:cid', CartController.getProductsInCartWithDetails);

export default router;
