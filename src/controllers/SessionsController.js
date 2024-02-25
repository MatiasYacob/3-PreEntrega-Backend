import passport from 'passport';
import { generateJWToken } from '../dirname.js';

const SessionsController = {};

// Passport GitHub
SessionsController.githubAuth = passport.authenticate('github', { scope: ['user:email'] });

SessionsController.githubCallback = passport.authenticate('github', {
    failureRedirect: '/github/error',
    successRedirect: '/users', // Redirigir a la página de usuarios después de una autenticación exitosa
});

// Passport local - Registro
SessionsController.register = passport.authenticate('register', {
    failureRedirect: "/fail-register",
});

// Passport local - Inicio de sesión
SessionsController.login = passport.authenticate('login', {
    failureRedirect: "/api/session/fail-login",
});

SessionsController.logout = (req, res) => {
    // Elimina la sesión del usuario
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al desloguear:", err);
            return res.status(500).send({ status: "error", message: "Error al desloguear" });
        }
        res.send({ status: "success", message: "Sesión cerrada exitosamente" });
    });
};

// Error en el registro
SessionsController.failRegister = (req, res) => {
    res.status(401).send({ error: "Fallo el registro" });
};

// Error en el inicio de sesión
SessionsController.failLogin = (req, res) => {
    res.status(401).send({ error: "Fallo el logueo" });
};

// Obtener el token de acceso usando JWT
SessionsController.getToken = (req, res) => {
    const user = req.user;
    const access_token = generateJWToken(user);
    console.log(access_token);
    res.send({ access_token: access_token });
};

export default SessionsController;
