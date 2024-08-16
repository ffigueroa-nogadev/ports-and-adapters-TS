import { Order } from "../order";
// Acá se define lo que tiene que entrar en la clase que tenga este método y también lo que retorna.
export interface IOrderRepository{
  addOrder(order:Order): Promise<Order>; // Es un contrato a cumplir
  getAllOrders(): Promise<Order[]>;
  getOrderByOrderId(orderId: number): Promise<Order | null>;
}