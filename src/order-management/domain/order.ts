export class Order {
  orderId: number;
  total: number;
  productId: number;
  createdAt: Date;
  constructor (productId: number, total: number){
    this.orderId= -1;
    this.total= total;
    this.productId= productId;
    this.createdAt= new Date();
  }
}