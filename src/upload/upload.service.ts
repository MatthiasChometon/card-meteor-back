import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  private filePath: string;
  private specificFolder: string;
  private file: FileUpload;
  private mainPath: string;

  private buildFilePath(): void {
    this.filePath = `${this.mainPath}/${this.specificFolder}/`;
    this.buildFolder(this.filePath);
  }

  private buildMainFolder() {
    this.mainPath = `${__dirname}/../uploads`;
    this.buildFolder(this.mainPath);
  }

  private buildFolder(folderName: string): void {
    if (!fs.existsSync(folderName)) fs.mkdirSync(folderName);
  }

  private async saveOnServer(): Promise<boolean> {
    const { createReadStream, filename } = this.file;
    const filePathToSave = `${this.filePath}${filename}`;

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(fs.createWriteStream(filePathToSave))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
  }

  async uploadFile(file: FileUpload, specificFolder: string): Promise<boolean> {
    this.specificFolder = specificFolder;
    this.file = file;
    this.buildMainFolder();
    this.buildFilePath();
    return await this.saveOnServer();
  }

  generateFileName(extension: string): string {
    const now = new Date();
    return `${Math.random() * now.getTime()}.${extension}`;
  }

  getFileExtension(file: FileUpload): string {
    return file.mimetype.split('/')[1];
  }
}
