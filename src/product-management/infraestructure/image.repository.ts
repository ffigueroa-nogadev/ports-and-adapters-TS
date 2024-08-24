import { NotFoundError } from "../../middlewares/customErrors";
import { prisma } from "../../prisma";
import { Image } from "../domain/image";
import {
  createImageDTO,
  IImageRepository,
} from "../domain/interfaces/image.interfaces";

export class ImageRepositoryPrisma implements IImageRepository {
  async createImage(data: createImageDTO): Promise<Image> {
    return prisma.productImage.create({
      data,
    });
  }

  async deleteImageById(id: number): Promise<Image> {
    const image = await prisma.productImage.delete({ where: { id } });
    if (!image) throw new NotFoundError("Image Not Found");
    return image;
  }

  async getImageById(id: number): Promise<Image> {
    const image = await prisma.productImage.findUnique({ where: { id } });
    if (!image) throw new NotFoundError("Image Not Found");
    return image;
  }

  async uptdateImageById(
    id: number,
    dto: { imageUrl?: string; storageId: string }
  ): Promise<Image> {
    const image = await prisma.productImage.update({
      where: { id },
      data: dto,
    });
    if (!image) throw new NotFoundError("Image Not Found");
    return image;
  }

  async createMultipleImages(data: createImageDTO[]): Promise<Image[]> {
    const imagePromises = data.map((image) => this.createImage(image));
    const images = await Promise.all(imagePromises);
    return  images;
  }
  async getImagesByProductId(productId: number): Promise<Image[]> {
    const images = await prisma.productImage.findMany({where: {productId}});
    return images;
  }
}
