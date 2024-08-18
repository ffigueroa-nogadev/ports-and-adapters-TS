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
    const { data } = await driveClient.files.create({ requestBody, media,fields: "id, name, webViewLink, mimeType" });

    if (!data.id || !data.name) throw new DriveUploadError();
    if (!data.webViewLink) throw new DrivePermissionError();

    return {
      fileId: data.id,
      name: data.name,
      mimeType: file.mimetype,
      webViewLink: data.webViewLink,
    };
  }

  async generatePublicUrl(fileId: string): Promise<DriveFileDTO> {
    await driveClient.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const { data } = await driveClient.files.get({
      fileId,
      fields: "webViewLink, id, mimeType, name",
    });
    if (!data.id || !data.name || !data.mimeType || !data.webViewLink) {
      throw new DrivePermissionError();
    }

    return {
      fileId: data.id,
      name: data.name,
      mimeType: data.mimeType,
      webViewLink: data.webViewLink,
    };
  }

  async deleteFile(fileId: string): Promise<void> {
    await driveClient.files.delete({ fileId });
  }
}
