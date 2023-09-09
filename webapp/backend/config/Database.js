import {Sequelize} from "sequelize";


const db = new Sequelize('courierhr_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});


export default db;