import { createOrder, getOneOrder, getOrders } from "../../dependency-simulated";
import { IOrderRepository } from "../domain/interfaces/order.interfaces";
import { Order } from "../domain/order";
import { prisma } from "../../prisma/index";

export class OrderRepositoryDummyData implements IOrderRepository {
  public async addOrder(order: Order): Promise<Order> {
    return createOrder(order.productId, order.total);
  }

  public async getAllOrders(): Promise<Order[]> {
    return getOrders();
  }

  public async getOrderByOrderId(orderId: number): Promise<Order> {
    return getOneOrder(orderId);
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
    return prisma.order.findUnique({where: {orderId}});
  }
}
