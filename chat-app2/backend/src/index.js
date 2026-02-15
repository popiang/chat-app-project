import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./libs/db.js";

const app = express();

dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    connectDB();
    console.log("Server started on port ", PORT);
});
