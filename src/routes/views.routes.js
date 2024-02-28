// router.js

import { Router } from "express";
import { Product } from "../services/dao/mongo/models/product.model.js";
import { Cart } from "../services/dao/mongo/models/cart.model.js";
import { passportCall, authorization } from "../dirname.js";
import * as CartController from "../controllers/CartController.js"
import * as ProductController from "../controllers/ProductController.js"


const router = Router();

// Rutas públicas
router.get("/", (req, res) => {
    res.render("home.hbs");
});



router.get('/realtimeproducts', passportCall('jwt'), authorization('USUARIO'), async (req, res) => {
    try {
        await ProductController.getProducts(req, res);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});
router.get("/products", passportCall('jwt'), authorization(['ADMIN', 'USUARIO']), async (req, res) => {
    try {
        await ProductController.getProductsUser(req, res);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});




router.get("/chat", (req, res) => {
    res.render("chat.hbs");
});


router.get('/cart', passportCall('jwt'), authorization('usuario'), CartController.getProductsInCartController);



router.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado este sitio: ${req.session.counter} veces.`);
    } else {
        req.session.counter = 1;
        res.send('Bienvenido!!');
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ error: "Error logout", msg: "Error al cerrar la sesión" });
        }
        res.send('Sesión cerrada correctamente!');
    });
});

export default router;
