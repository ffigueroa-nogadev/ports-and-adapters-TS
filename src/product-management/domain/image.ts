export class Image {
  id: number;
  productId: number;
  webViewLink: string;
  webContentLink: string;
  storageId: string;
  createdAt: Date;
  constructor(productId: number, webViewLink: string, webContentLink: string, storageId:string) {
    this.id = -1;
    this.productId = productId;
    this.webViewLink = webViewLink;
    this.webContentLink = webContentLink;
    this.storageId = storageId;
    this.createdAt = new Date();
  }
}