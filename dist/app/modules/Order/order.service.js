"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const queryBuilder_1 = __importDefault(require("../../../helpers/queryBuilder"));
const createOrderIntoDB = async (user, payload) => {
    // Check if product exists
    const product = await prisma_1.default.product.findUnique({
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
    const order = await prisma_1.default.order.create({
        data: {
            userId: user.id,
            productId: payload.productId,
            quantity: payload.quantity,
            totalPrice: product.price * payload.quantity,
        },
    });
    // Update product stock
    await prisma_1.default.product.update({
        where: { id: payload.productId },
        data: {
            stock: product.stock - payload.quantity,
        },
    });
    return order;
};
const getMyOrdersFromDB = async (user, query) => {
    const queryBuilder = new queryBuilder_1.default(prisma_1.default.order, query);
    const orders = await queryBuilder
        .range()
        .filter()
        .sort()
        .paginate()
        .fields()
        .execute({
        where: { userId: user.id },
        include: {
            product: true, // show product details
        },
    });
    const meta = await queryBuilder.countTotal();
    return { meta, data: orders };
};
exports.OrderServices = {
    createOrderIntoDB,
    getMyOrdersFromDB,
};
//# sourceMappingURL=order.service.js.map