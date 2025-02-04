import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Zugirff verweigert, kein Token vorhanden!" });
    }
    try {
        const decode = jwt.verify(token, config.jwtSecret);
        req.user = decode;
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Interner Serverfehler, ungültiges Token!" });
    }
};
