import { Router } from "express";
import JwtController from "../controllers/JwtController.js";
import { authToken, authorization } from "../dirname.js";

const jwtRouter = Router();

// Ruta para el inicio de sesión (POST /login)
jwtRouter.post("/login", JwtController);

// Rutas protegidas con autorización basada en roles
jwtRouter.get('/ruta-admin', authToken, authorization('ADMIN'), (req, res) => {
    res.send('Bienvenido a la vista de administrador');
});

jwtRouter.get('/ruta-usuario', authToken, authorization('USUARIO'), (req, res) => {
    console.log('Contenido del token:', req.user);
    res.send('Bienvenido a la vista de usuario');
});

export default jwtRouter;
