import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Request,
  Route,
} from "tsoa";
import { Express } from "express";
import { ProductService } from "../../application/product.service";
import { ImageService } from "../../application/image.service";
import { ProductRepositoryPrisma } from "../product.repository";
import { ImageRepositoryPrisma } from "../image.repository";
import { DriveService } from "../../../google/drive-management/application/drive.service";
import { DriveRepository } from "../../../google/drive-management/infraestructure/drive.repository";
import { envs } from "../../../envs";
import { DriveFileDTO } from "../../../google/drive-management/domain/drive.interface";

@Route("products")
export class ProductController extends Controller {
  private readonly productService: ProductService;
  private readonly imageService: ImageService;
  private readonly driveService: DriveService;
  constructor() {
    super();
    var productRepository = new ProductRepositoryPrisma();
    var imageRepository = new ImageRepositoryPrisma();
    var driveRepository = new DriveRepository();
    this.productService = new ProductService(productRepository);
    this.imageService = new ImageService(imageRepository);
    this.driveService = new DriveService(driveRepository);
  }
  @Post()
  public async addProduct(
    @Body() requestBody: { name: string; price: number; description: string },
    @Request() request: Express.Request
  ) {
    const files = request.files as Express.Multer.File[];
    const driveDataSavedList: DriveFileDTO[] = await Promise.all(
      files.map(async (file) => {
        const fileSaved = await this.driveService.uploadFile(
          file,
          envs.GDRIVE_FOLDER_ID
        );
        return fileSaved;
      })
    );

    const product = await this.productService.addProduct(
      requestBody.name,
      requestBody.description,
      requestBody.price
    );
    console.log("driveDataSavedList => ", driveDataSavedList);

    const images = await this.imageService.createMultipleImages(
      driveDataSavedList.map(
        ({ fileId: storageId, webContentLink, webViewLink }) => ({
          webContentLink,
          webViewLink,
          storageId,
          productId: product.id,
        })
      )
    );

    return { ...product, images };
  }

  @Get("{productId}/images")
  public async getProductById(@Path() productId: number) {
    const product = await this.productService.getProductById(productId);
    const imagesOfProduct = await this.imageService.getImagesByProductId(
      product.id
    );
    return { ...product, images: imagesOfProduct };
  }
}
