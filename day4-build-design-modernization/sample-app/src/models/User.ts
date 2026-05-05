import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface UserAttributes {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
  role: "customer" | "admin";
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "role" | "isActive" | "lastLoginAt" | "createdAt" | "updatedAt"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public name!: string;
  public passwordHash!: string;
  public role!: "customer" | "admin";
  public isActive!: boolean;
  public lastLoginAt!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password_hash",
    },
    role: {
      type: DataTypes.ENUM("customer", "admin"),
      allowNull: false,
      defaultValue: "customer",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "last_login_at",
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "users",
    underscored: true,
  }
);

export default User;
