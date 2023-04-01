import express from "express";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use = express();


// Define Routes Here
const port = process.env.SERVER_PORT || 4000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});