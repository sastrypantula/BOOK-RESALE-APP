const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('../config/db')
const cookieParser =  require('cookie-parser');
const redisClient=require('../config/redis')
const setUserFromToken = require('../middleware/setuserToken');


const authRouter = require('./routes/userAuth');
const buyerRouter = require('./routes/buyerRouter');
const sellerRouter = require('./routes/sellerRouter');
const transactionRouter = require('./routes/transactionRouter');

app.use(express.json());
app.use(cookieParser());
app.use(setUserFromToken);


const cors = require('cors');
const authMiddleware = require('../middleware/authMiddleware');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}))


app.use('/user', authRouter);
app.use('/buyer', buyerRouter);
app.use('/seller', sellerRouter);
app.use('/transaction', transactionRouter);
// added the checking the authentication 

const InitalizeConnection = async ()=>{
    try{
await Promise.all([main(), redisClient.connect()]);
app.listen(process.env.PORT, () => {
    console.log("Server listening at port number: " + process.env.PORT);
});
}
catch(err){
    console.log("Error Occurred: "+err); 
}
}
InitalizeConnection();