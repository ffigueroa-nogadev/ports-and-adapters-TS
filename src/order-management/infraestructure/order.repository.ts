import { createOrder, deleteOneOrder, getOneOrder, getOrders } from "../../dependency-simulated";
import { IOrderRepository } from "../domain/interfaces/order.interfaces";
import { Order } from "../domain/order";
import { prisma } from "../../prisma/index";
import { NotFoundError } from "../../middlewares/customErrors";

export class OrderRepositoryDummyData implements IOrderRepository {
  public async addOrder(order: Order): Promise<Order> {
    return createOrder(order.productId, order.total);
  }

  public async getAllOrders(): Promise<Order[]> {
    return getOrders();
  }

  public async getOrderByOrderId(orderId: number): Promise<Order> {
    const order = await getOneOrder(orderId);
    if (!order) {
      throw new NotFoundError('Order Not Found');
    }
    return order;
  }

  public async deleteOrderById(orderId: number): Promise<Order | null> {
    const order = await deleteOneOrder(orderId);
    if (!order) {
      throw new NotFoundError('Order Not Found');
    }
    return order;
  }
}

export class OrderRepositoryPrisma implements IOrderRepository {
  public async addOrder(order: Order): Promise<Order> {
    return prisma.order.create({
      data: { productId: order.productId, total: order.total },
    });
  }

  public async getAllOrders(): Promise<Order[]> {
    return prisma.order.findMany();
  }

  public async getOrderByOrderId(orderId: number): Promise<Order | null > {
    const order = await prisma.order.findUnique({where: {orderId}});
    if (!order) {
      throw new NotFoundError('Order Not Found');
    }
    return order;
  }

  public async deleteOrderById(orderId: number): Promise<Order | null> {
    const order = await prisma.order.delete({where: {orderId}});
    if (!order) {
      throw new NotFoundError('Order Not Found');
    }
    return order;
  }
}
