import { Express } from "express";
import { DriveFileDTO } from "../domain/drive.interface";
import { IDriveFileRepository } from "../domain/interfaces/drive.interfaces";

export class DriveService {
  driveRepository: IDriveFileRepository;

  constructor(driveRepository: IDriveFileRepository) {
    this.driveRepository = driveRepository;
  }

  public async uploadFile(file: Express.Multer.File, filePath: string): Promise<DriveFileDTO> {
    return this.driveRepository.uploadFile(file, filePath);
  }

  public async deleteFile(fileId: string): Promise<void> {
    return this.driveRepository.deleteFile(fileId);
  }

  public async generatePublicUrl(fileId: string): Promise<DriveFileDTO> {
    return this.driveRepository.generatePublicUrl(fileId);
  }
}
