import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import Order from "./Order";
import Product from "./Product";

interface LineItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
}

interface LineItemCreationAttributes
  extends Optional<LineItemAttributes, "id" | "subtotal" | "createdAt" | "updatedAt"> {}

class LineItem extends Model<LineItemAttributes, LineItemCreationAttributes> implements LineItemAttributes {
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
  public unitPrice!: number;
  public subtotal!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LineItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order_id",
      references: {
        model: "orders",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id",
      references: {
        model: "products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "unit_price",
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
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
    tableName: "line_items",
    underscored: true,
  }
);

// Associations
LineItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
LineItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
Order.hasMany(LineItem, { foreignKey: "orderId", as: "lineItems" });
Product.hasMany(LineItem, { foreignKey: "productId", as: "lineItems" });

export default LineItem;
