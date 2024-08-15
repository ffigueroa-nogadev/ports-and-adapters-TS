import { createOrder, getOneOrder, getOrders } from "../../dependency-simulated";
import { IOrderRepository } from "../domain/interfaces/order.interfaces";
import { Order } from "../domain/order";

export class OrderRepositoryDummyData implements IOrderRepository {
  public async addOrder(order: Order): Promise<Order> {
    return createOrder(order.productId, order.total);
  }

  public async getAllOrders(): Promise<Order[]> {
    return getOrders();
  }

  public async getOrderByOrderId (orderId: number): Promise<Order> {
    return getOneOrder(orderId);
  }
}