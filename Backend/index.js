import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './Routes/User.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import messageRoute from './Routes/message.route.js'
import { app, server } from './SocketIO/server.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const PORT = process.env.PORT || 3000;

app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(express.json())

const URI = process.env.MONGODB_URI;

// routes
app.use("/api/user", userRoutes)
app.use("/api/message", messageRoute)

// serve frontend
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));
    app.get('*path', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../Frontend/dist', 'index.html'));
    });

const startServer = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connected to MongoDB');
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log('Error while starting server:', error);
        process.exit(1);
    }
};

startServer();