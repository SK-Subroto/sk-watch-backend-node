const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRouter = require('./routers/product')
const orderRouter = require('./routers/order');
const reviewRouter = require('./routers/review');
const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', reviewRouter);
app.use('/api', userRouter);

const DatabaseName = "sk-watch2";
const mongoString = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.e3jxy.mongodb.net/${DatabaseName}?retryWrites=true&w=majority`;
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})
