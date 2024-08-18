import { Product } from "../product";

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
}

export interface IProductRepository{
  addProduct(product:Product): Promise<Product>;
  getAllProducts():Promise<Product[]>;
  getProductById(id:number): Promise<Product>;
  deleteProductById(id:number): Promise<Product>;
  updateProductById(id:number, dto: UpdateProductDTO): Promise<Product>;
}