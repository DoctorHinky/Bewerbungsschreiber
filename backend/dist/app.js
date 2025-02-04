import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { config } from "./config/config.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.listen(config.port, () => {
    console.log(`Server läuft auf http://localhost:${config.port}`);
});
