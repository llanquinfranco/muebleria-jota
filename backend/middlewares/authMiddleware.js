const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedPayload;
            next();
        } catch (error) {
            return res.status(403).json({ message: "Prohibido. Token inválido o expirado." });
        }
    } else {
        res.status(401).json({ message: "No estás autenticado. Token no proporcionado." });
    }
};

const onlyAdmin = (req, res, next) => {
    if (req.usuario?.rol !== "admin") {
        return res.status(403).json({ error: "Acceso denegado" });
    }

    return next();
};

module.exports = {verifyToken, onlyAdmin};
