import { Router } from "express";
import JwtController from "../controllers/JwtController.js";

const jwtRouter = Router();

// Ruta para el inicio de sesión (POST /login)
jwtRouter.post("/login", JwtController);

export default jwtRouter;
