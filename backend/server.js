import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/user_routes.js';
import router2 from './routes/thought_routes.js';


const app = express();
dotenv.config();

// Middleware


app.use(cors());
app.use(json());

app.use(router);
app.use(router2);
// Connect to MongoDB
connect(process.env.ATLAS_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));


// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.get("/", (req, res) => {
    res.send("✅ Backend is running!");
});
