export class Image {
  id: number;
  productId: number;
  imageUrl: string;
  storageId: string;
  createdAt: Date;
  constructor(productId: number, imageUrl: string, storageId:string) {
    this.id = -1;
    this.productId = productId;
    this.imageUrl = imageUrl;
    this.storageId = storageId;
    this.createdAt = new Date();
  }
}