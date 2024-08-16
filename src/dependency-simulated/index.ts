import { Order } from "../order-management/domain/order";

const orderList: Order[] = [
  new Order(1, 100),
  new Order(2, 250),
  new Order(3, 150),
  new Order(4, 75),
  new Order(5, 300),
  new Order(6, 125),
  new Order(7, 200),
  new Order(8, 350),
  new Order(9, 175),
  new Order(10, 225),
];

orderList.forEach((order, index) => {
  order.orderId = index + 1;
});


const createOrder = async (productId: number, total: number): Promise<Order> => {
  const newOrder = new Order(productId, total);
  newOrder.orderId = orderList[orderList.length - 1].orderId + 1;
  orderList.push(newOrder);
  return new Promise((res, rej) => {
    res(newOrder);
  });
}

const getOrders = async (): Promise<Order[]> => {
  return new Promise(res => res(orderList));
}

const getOneOrder = async (orderId:number): Promise<Order> =>{
  const order = orderList.find(orderData=> orderData.orderId === orderId);
  return new Promise((resolve, reject) => {
    if (!order) {
      reject("La orden buscada no existe")
    }else{
      resolve(order)
    }
  })
}

const deleteOneOrder = async (orderId: number): Promise<Order | null>=>{
  const order = orderList.find(order=> order.orderId === orderId);
  return new Promise((res, rej)=> {
    if (!order) {
      rej("La orden buscada no existe")
    }else{
      orderList.splice(orderList.findIndex(o=>o.orderId === order.orderId), 1);
      res(order);
    }
  })
}

export { createOrder, getOrders, getOneOrder, deleteOneOrder };