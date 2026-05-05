import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string | null;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id" | "imageUrl" | "isAvailable" | "createdAt" | "updatedAt"> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public stock!: number;
  public category!: string;
  public imageUrl!: string | null;
  public isAvailable!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "image_url",
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_available",
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
    tableName: "products",
    underscored: true,
  }
);

export default Product;
