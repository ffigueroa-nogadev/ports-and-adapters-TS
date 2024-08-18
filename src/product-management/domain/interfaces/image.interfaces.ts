import { Image } from "../image";
export interface createImageDTO {
  productId: number;
  imageUrl: string;
  storageId: string;
}
export interface IImageRepository {
  createImage(
    data: createImageDTO 
  ): Promise<Image>;
  deleteImageById(id: number): Promise<Image>;
  getImageById(id: number): Promise<Image>;
  uptdateImageById(
    id: number,
    dto: { imageUrl?: string; storageId?: string }
  ): Promise<Image>;
  createMultipleImages(data: createImageDTO[]):Promise<Image[]>;
}
