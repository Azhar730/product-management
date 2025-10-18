import { Order } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import QueryBuilder from "../../../helpers/queryBuilder";

const createOrderIntoDB = async (
  user: JwtPayload,
  payload: { productId: string; quantity: number }
): Promise<Order> => {
  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: payload.productId },
  });

  if (!product) {
    throw new Error("Product not found!");
  }

  // Check stock
  if (product.stock < payload.quantity) {
    throw new Error("Insufficient stock!");
  }

  // Create order
  const order = await prisma.order.create({
    data: {
      userId: user.id as string,
      productId: payload.productId,
      quantity: payload.quantity,
      totalPrice: product.price * payload.quantity,
    },
  });

  // Update product stock
  await prisma.product.update({
    where: { id: payload.productId },
    data: {
      stock: product.stock - payload.quantity,
    },
  });

  return order;
};


const getMyOrdersFromDB = async (
  user: JwtPayload,
  query: Record<string, any>
): Promise<IGenericResponse<Order[]>> => {
  const queryBuilder = new QueryBuilder(prisma.order, query);

  const orders = await queryBuilder
    .range()
    .filter()
    .sort()
    .paginate()
    .fields()
    .execute({
      where: { userId: user.id as string },
      include: {
        product: true, // show product details
      },
    });

  const meta = await queryBuilder.countTotal();

  return { meta, data: orders };
};

export const OrderServices = {
  createOrderIntoDB,
  getMyOrdersFromDB,
};