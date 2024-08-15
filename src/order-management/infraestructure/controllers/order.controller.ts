import { Body, Controller, Get, Path, Post, Route } from "tsoa"
import { OrderService } from "../../application/order.service"
import { OrderRepositoryDummyData } from "../order.repository";
import { Order } from "../../domain/order";

// tsoa no permite parámetros en el constructor de la clase que extiende del constructor. Por eso lo siguiente no tiene inyección de dependencia

@Route('order')
export class OrderController extends Controller{
  private readonly orderService: OrderService;
  constructor() {
    super();
    var orderRepository = new OrderRepositoryDummyData();
    this.orderService = new OrderService(orderRepository);
  }

  @Post()
  public async addOrder( @Body() requestBody: {productId: number, total: number}):Promise<Order>{
    const {productId, total} = requestBody;
    return await this.orderService.addOrder(productId, total);
  }

  @Get()
  public getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get('{orderId}')
  public getOrderByOrderId(@Path() orderId: number): Promise<Order>{
    return this.orderService.getOrderByOrderId(orderId);
  }
};