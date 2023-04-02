import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv'; 
dotenv.config();

const db = new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:5432,
    host:process.env.DB_URL,
    dialect:"postgres",
    logging:false
});

export default db;