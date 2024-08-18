import {
  IProductRepository,
  UpdateProductDTO,
} from "../domain/interfaces/product.interfaces";
import { Product } from "../domain/product";

export class ProductService {
  private productRepository: IProductRepository;
  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async addProduct(
    name: string,
    description: string,
    price: number,
  ): Promise<Product> {
    const product: Product = new Product(name, description, price);
    return await this.productRepository.addProduct(product);
  }

  public async updateProductById(
    id: number,
    dto: UpdateProductDTO
  ): Promise<Product> {
    return this.productRepository.updateProductById(id, dto);
  }

  public async deleteProductById(id:number): Promise<Product>{
    return this.productRepository.deleteProductById(id);
  }

  public async getAllProducts():Promise<Product[]>{
    return this.productRepository.getAllProducts();
  }

  public async getProductById(id: number): Promise<Product>{
    return this.productRepository.getProductById(id);
  }

}
