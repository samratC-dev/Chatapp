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
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
const URI=process.env.MONGODB_URI;
///routes
app.use("/api/user", userRoutes) 
app.use("/api/message",messageRoute)
try {
    mongoose.connect(URI)
    .then(console.log('Connected to MongoDB'))

} catch (error) {
    console.log(error)
    
}



 app.get('/', (req, res) => {
    res.send('Hello World!');
});
const PORT =3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
