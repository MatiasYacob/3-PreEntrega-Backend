// router.js

import { Router } from "express";
import { Product } from "../services/dao/mongo/models/product.model.js";
import { Cart } from "../services/dao/mongo/models/cart.model.js";
import authorize from "../middlewares/authorizationMiddleware.js"; // Importa el middleware

const router = Router();

// Rutas públicas
router.get("/", (req, res) => {
    res.render("home.hbs");
});

router.get("/realtimeproducts", (req, res) => {
    res.render("product.hbs");
});

router.get("/chat", (req, res) => {
    res.render("chat.hbs");
});

// Rutas protegidas
router.get("/cart", authorize(["USUARIO"]), async (req, res) => {
    const { page, limit } = req.query;

    try {
        const cartResult = await Cart.paginate({}, {
            page: page || 1,
            limit: limit || 10,
        });

        const cart_productos = cartResult.docs; // Obtener solo los documentos

        console.log("Productos del carrito:", cart_productos);
        res.render("cart", {
            cart_productos
        });
    } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
        res.status(500).send("Error al obtener productos del carrito");
    }
});

router.get('/session', authorize(["USER"]), (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado este sitio: ${req.session.counter} veces.`);
    } else {
        req.session.counter = 1;
        res.send('Bienvenido!!');
    }
});

router.get('/logout', authorize(["USER"]), (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ error: "Error logout", msg: "Error al cerrar la sesión" });
        }
        res.send('Sesión cerrada correctamente!');
    });
});

// Ruta para obtener y renderizar los productos en el carrito
router.get("/cart", authorize(["USER"]), async (req, res) => {
    const { page, limit } = req.query;

    try {
        const cartResult = await Cart.paginate({}, {
            page: page || 1,
            limit: limit || 10,
        });

        const cart_productos = cartResult.docs; // Obtener solo los documentos

        console.log("Productos del carrito:", cart_productos);
        res.render("cart", {
            cart_productos
        });
    } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
        res.status(500).send("Error al obtener productos del carrito");
    }
});

// Ruta para obtener y renderizar la lista de productos paginados
router.get("/products", async (req, res) => {
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

export default router;
