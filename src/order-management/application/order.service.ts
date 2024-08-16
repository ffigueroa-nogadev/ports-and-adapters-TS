import { IOrderRepository } from "../domain/interfaces/order.interfaces";
import { Order } from "../domain/order";

// primero se contruye la clase con el repository de la entidad
export class OrderService {
  private orderRepository: IOrderRepository; // Acá se le pone el tipo con el contrato
  constructor(orderRepository: IOrderRepository){ // acá se recibe el repository que ejecuta la acción y se le solicita que sea de cierto tipo también para que no choque con el que definimos anteriormente
    this.orderRepository = orderRepository;
  }

  public async addOrder(productId: number, total: number):Promise<Order> {
    const order:Order = new Order(productId, total); // Instanciamos la orden para que sea exactamente con la estructura que definimos
    return await this.orderRepository.addOrder(order); 
  }

  public async getAllOrders():Promise<Order[]>{
    return await this.orderRepository.getAllOrders();
  }

  public async getOrderByOrderId(orderId: number): Promise<Order | null>{
    return await this.orderRepository.getOrderByOrderId(orderId);
  }
}