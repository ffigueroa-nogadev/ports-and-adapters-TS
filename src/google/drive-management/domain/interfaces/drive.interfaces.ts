import { Express } from "express";
import { DriveFileDTO } from "../drive.interface";

export interface IDriveFileRepository {
  uploadFile(file: Express.Multer.File, filePath: string): Promise<DriveFileDTO>;
  deleteFile(fileId: string): Promise<void>;
  generatePublicUrl(fileId: string): Promise<void>;
}
