import { Image } from "../domain/image";
import { createImageDTO, IImageRepository } from "../domain/interfaces/image.interfaces";

export class ImageService {
  private imageRepository: IImageRepository;
  constructor(imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  public async getImageById(id: number): Promise<Image> {
    return this.imageRepository.getImageById(id);
  }

  public async deleteImageById(id: number): Promise<Image> {
    return this.imageRepository.deleteImageById(id);
  }

  public async updateImageById(
    id: number,
    dto: { imageUrl?: string, storageId: string }
  ): Promise<Image> {
    return this.imageRepository.uptdateImageById(id, dto);
  }

  public async createImage(id: number, webViewLink: string, fileId: string, data: createImageDTO): Promise<Image> {
    return this.imageRepository.createImage(data);
  }

  public async createMultipleImages(data: createImageDTO[]):Promise<Image[]>{
    return await this.imageRepository.createMultipleImages(data);
  }
  
}
