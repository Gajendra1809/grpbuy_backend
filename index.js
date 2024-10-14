import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './src/db/db.js';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(() => {  
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})

import userRoute from './src/routes/user.route.js';
import categoryRoute from './src/routes/category.route.js';
import groupRoute from './src/routes/group.route.js';
import bidRoute from './src/routes/bid.route.js';

app.use('/api/users', userRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/groups', groupRoute);
app.use('/api/bids', bidRoute);
