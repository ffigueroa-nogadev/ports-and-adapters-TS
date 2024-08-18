import { NotFoundError } from "../../middlewares/customErrors";
import { prisma } from "../../prisma";
import {
  IProductRepository,
  UpdateProductDTO,
} from "../domain/interfaces/product.interfaces";
import { Product } from "../domain/product";

export class ProductRepositoryPrisma implements IProductRepository {
  async addProduct(product: Product): Promise<Product> {
    return prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
      },
    });
  }

  async deleteProductById(id: number): Promise<Product> {
    const product = await prisma.product.delete({ where: { id } });
    if (!product) throw new NotFoundError("Product Not Found");
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  async updateProductById(
    id: number,
    dto: UpdateProductDTO
  ): Promise<Product> {
    const product = await prisma.product.update({where: {id}, data: dto});
    if (!product) throw new NotFoundError("Product Not Found");
    return product;
  }

  async getProductById(id: number): Promise<Product> {
    const product = await prisma.product.findUnique({where: {id}});
    if (!product) throw new NotFoundError("Product Not Found");
    return product;
  }
}
