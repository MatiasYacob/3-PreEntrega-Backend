// routes/cart.router.js

import { Router } from 'express';
import * as CartController from '../controllers/CartController.js';
import { passportCall, authorization } from "../dirname.js";

import { ticketRepository } from '../services/service.js';
const router = Router();

router.post('/tickets/create', async (req, res) => {
    const userId = req.body.userId;  // Ajusta según cómo estás manejando el ID del usuario
    try {
        const ticket = await ticketRepository.create(userId);
        res.status(201).json(ticket);
    } catch (error) {
        console.error('Error al crear el ticket:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.get('/tickets/get', async (req, res) => {
    const userId = req.body.userId;

    try {
        const tickets = await ticketService.getTicketsByUser(userId);
        res.status(200).render('tickets', tickets);
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener los tickets' });
    }
});



router.post('/:productId', passportCall('jwt'), authorization(['USUARIO']), CartController.AddProductToCart);

router.delete('/:productId', passportCall('jwt'), authorization(['USUARIO']), CartController.removeProductFromCart);

router.delete('/', passportCall('jwt'), authorization(['USUARIO']), CartController.removeAllProductsFromCart);

router.put('/:_id', CartController.updateProductQuantity);

router.put('/cart/:_id', CartController.updateCart);

router.get('/cart/:cid', CartController.getProductsInCartWithDetails);

export default router;
