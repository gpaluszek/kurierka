import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const { DataTypes } = Sequelize;

const EmployeeAgreement = db.define(
  "employeeAgreement",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    startContract: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100]
      }
    },
    endContract: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    typeContract: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    freezeTableName: true
  }
);


export default EmployeeAgreement;
