import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";

interface OrderAttributes {
  id: number;
  userId: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  shippingAddress: string;
  couponCode: string | null;
  discountAmount: number;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderCreationAttributes
  extends Optional<OrderAttributes, "id" | "status" | "couponCode" | "discountAmount" | "notes" | "createdAt" | "updatedAt"> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public status!: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  public total!: number;
  public shippingAddress!: string;
  public couponCode!: string | null;
  public discountAmount!: number;
  public notes!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "processing", "shipped", "delivered", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "shipping_address",
    },
    couponCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "coupon_code",
    },
    discountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      field: "discount_amount",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "orders",
    underscored: true,
  }
);

// Associations
Order.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Order, { foreignKey: "userId", as: "orders" });

export default Order;
