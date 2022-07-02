import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import * as fs from 'fs';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class UploadService {
  constructor() {
    this.bucket = admin.storage().bucket(process.env.BUCKET_NAME);
  }
  private bucket: Bucket;

  async uploadFile(file: FileUpload, specificFolder: string): Promise<void> {
    await this.localUpload(file);
    await this.bucketUpload(file, specificFolder);
    this.removeLocalFile(file);
  }

  async deleteFile(path: string) {
    const prefix = `${path}`;
    this.bucket.deleteFiles({ prefix });
  }

  private async bucketUpload(
    file: FileUpload,
    specificFolder: string,
  ): Promise<void> {
    const destination = `${specificFolder}/${file.filename}`;
    await this.bucket.upload(file.filename, {
      destination,
    });
  }

  private async localUpload(file: FileUpload): Promise<boolean> {
    const { createReadStream, filename } = file;

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(fs.createWriteStream(filename))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
  }

  private removeLocalFile(file: FileUpload): void {
    fs.unlinkSync(file.filename);
  }

  generateFileName(extension: string): string {
    const now = new Date();
    return `${Math.random() * now.getTime()}.${extension}`;
  }

  getFileExtension(file: FileUpload): string {
    return file.mimetype.split('/')[1];
  }
}
