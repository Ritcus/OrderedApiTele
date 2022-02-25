import express from 'express';
import bodyParser from 'body-parser';

import orderRoutes from './routes/orders.js'

const app = express();
const PORT = 5050;

//using json data in the api for sending and receiving api

app.use(bodyParser.json());  

//routes to get, post orders

app.use ('/orders', orderRoutes); 



//error handler: if the user input any routes other than the above /orders it will automatically display error not found image 

app.use((req,res,next)=>{
    const error = new Error ('Route Not found !! Please use the inbuilt one to navigate to one');
    error.status=404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
                                                                               

//listenining for incoming request using port

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));  
