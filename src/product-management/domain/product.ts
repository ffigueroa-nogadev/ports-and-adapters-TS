export class Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  createdAt: Date;
  constructor(name: string, description: string, price: number) {
    this.id = -1;
    this.name = name;
    this.description = description;
    this.price = price;
    this.createdAt = new Date();
  }
}