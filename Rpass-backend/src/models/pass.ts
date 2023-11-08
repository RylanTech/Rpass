import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { user } from "./user";

export class pass extends Model<InferAttributes<pass>, InferCreationAttributes<pass>>{
    declare passId: number;
    declare serviceName: string;
    declare email: string;
    declare username: string;
    declare password: string;
    declare twoFactorKey: string;
    declare otherNotes: string;
    declare userId: number;
}

export function passFactory(sequelize: Sequelize) {
    pass.init({
        passId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
        },
        serviceName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
        },
        twoFactorKey: {
            type: DataTypes.STRING,
        },
        otherNotes: {
            type: DataTypes.TEXT,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            freezeTableName: true,
            tableName: 'pass',
            sequelize,
            collate: 'utf8_general_ci',
        })
}

export function AssociateUserPass() {
    user.hasMany(pass, { foreignKey: "userId" });
    pass.belongsTo(user, { foreignKey: "userId" });
  }
  