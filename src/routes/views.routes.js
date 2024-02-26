// router.js

import { Router } from "express";
import { Product } from "../services/dao/mongo/models/product.model.js";
import { Cart } from "../services/dao/mongo/models/cart.model.js";
import { passportCall, authorization } from "../dirname.js";

const router = Router();

// Rutas públicas
router.get("/", (req, res) => {
    res.render("home.hbs");
});

router.get("/realtimeproducts",passportCall('jwt'), authorization('ADMINISTRADOR'), (req, res) => {
    res.render("product.hbs");
});

router.get("/chat", (req, res) => {
    res.render("chat.hbs");
});

// Rutas protegidas con autenticación y autorización
router.get("/cart", passportCall('jwt'), authorization('USUARIO'), async (req, res) => {
    const { page, limit } = req.query;

    try {
        const cartResult = await Cart.paginate({}, {
            page: page || 1,
            limit: limit || 10,
        });

        const cart_productos = cartResult.docs;

        console.log("Productos del carrito:", cart_productos);
        res.render("cart", {
            cart_productos
        });
    } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
        res.status(500).send("Error al obtener productos del carrito");
    }
});

router.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado este sitio: ${req.session.counter} veces.`);
    } else {
        req.session.counter = 1;
        res.send('Bienvenido!!');
    }
});

router.get("/products", passportCall('jwt'), authorization('USUARIO'), async (req, res) => {
    const { page, limit } = req.query;

    const productos = await Product.paginate({}, {
        page: page || 1,
        limit: limit || 10,
    });

    res.render("productos", {
        productos,
        user: req.session.user
    });
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
