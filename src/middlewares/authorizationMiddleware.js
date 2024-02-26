const authorize = (roles) => {
    return (req, res, next) => {
        // Imprimir el contenido del objeto req.user en la consola
        console.log('Contenido de req.user:', req.user);

        // Verificar si el usuario tiene un rol definido y si coincide con alguno de los roles permitidos
        if (!req.user || roles.some(role => req.user.role === role)) {
            return next(); // Usuario autorizado, continuar con la siguiente función de middleware o controlador
        } else {
            return res.status(403).send({ status: "error", error: "Acceso no autorizado" });
        }
    };
};

export default authorize;
