import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './Routes/User.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import messageRoute from './Routes/message.route.js'
import { app, server } from './SocketIO/server.js';
dotenv.config();
// const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const PORT = process.env.PORT || 3000;
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(express.json())
const URI=process.env.MONGODB_URI;
///routes
app.use("/api/user", userRoutes) 
app.use("/api/message",messageRoute)
app.get('/', (req, res) => {
    res.send('Hello World!');
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
