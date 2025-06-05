// importing express
const express = require('express');
const UserRouter = require('./routers/userRouter');
const templateRouter = require('./routers/templateRouter');
const reviewRouter = require('./routers/reviewRouter');
const orderRouter = require('./routers/orderRouter');
const paymentRoutes = require('./routers/paymentroutes');
const cors = require('cors');

// initializing express
const app = express();
const port = 5000;

// middleware
app.use(cors({
    origin: 'http://localhost:3000'
})
);

app.use(express.json());
app.use('/api/payment', paymentRoutes);
app.use('/user', UserRouter);
app.use('/template', templateRouter);
app.use('/review', reviewRouter);
app.use('/order', orderRouter);


// route or endpoint
app.get('/', (req, res) => {
    res.send('Response from express')
});

app.listen(port, () => { console.log('server started') });
