import { Sequelize } from "sequelize";
import { userFactory } from "./user";
import { AssociateUserPass, passFactory } from "./pass";

const dbName = "rpass"
const username = "root"
const password = "0624"

// const dbName = process.env.DB_NAME ?? '';
// const username = process.env.DB_USER ?? '';
// const password = process.env.DB_PASS ?? '';

const sequelize = new Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

userFactory(sequelize)
passFactory(sequelize)
AssociateUserPass()

export const db = sequelize;