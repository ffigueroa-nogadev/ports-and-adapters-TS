import { bufferToStream } from "../../../utils/convertFIleToStream";
import { DriveFileDTO } from "../domain/drive.interface";
import { IDriveFileRepository } from "../domain/interfaces/drive.interfaces";
import { driveClient } from "./drive.client";
import { DrivePermissionError, DriveUploadError } from "../../../middlewares/customErrors";
import { Express } from "express";

export class DriveRepository implements IDriveFileRepository {
  async uploadFile(file: Express.Multer.File, filePath: string): Promise<DriveFileDTO> {
    const requestBody = {
      name: new Date().toISOString(),
      mimeType: file.mimetype,
      parents: [filePath],
    };
    const media = {
      mimeType: file.mimetype,
      body: bufferToStream(file.buffer),
    };
    const { data } = await driveClient.files.create({ requestBody, media,fields: "id, name, webContentLink, mimeType, webViewLink" });

    if (!data.id || !data.name) throw new DriveUploadError();
    if (!data.webContentLink || !data.webViewLink) throw new DrivePermissionError();
    await this.generatePublicUrl(data.id);  
    return {
      fileId: data.id,
      name: data.name,
      mimeType: file.mimetype,
      webContentLink: data.webContentLink,
      webViewLink: data.webViewLink
    };
  }

  async generatePublicUrl(fileId: string): Promise<void> {
    await driveClient.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
  }

  async deleteFile(fileId: string): Promise<void> {
    await driveClient.files.delete({ fileId });
  }
}
