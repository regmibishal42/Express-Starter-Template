import express from 'express';
import * as dotenv from 'dotenv'; 
dotenv.config();
import db from './config/db.js';


// Controllers HERE

const app = express();
app.use(express.json());
console.log("DATABASE password IS",process.env.DB_PASSWORD);

//database connection
(async()=>{
    try {
        db.authenticate('connected');
        db.sync({alter:true});
        console.log('Connected to postgres');
        
    } catch (error) {
        console.log('Database connection error',error);
    }
})();

//Error Handler 
app.use((error,req,res,next)=>{
    return res.status(400).json({
        success:false,
        message:"An Error Occurred",
        error:error.message
    });
})

// Define Routes Here
const port = process.env.SERVER_PORT || 4000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});