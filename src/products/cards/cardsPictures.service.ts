import { Injectable } from '@nestjs/common';
import { UploadService } from '../../upload/upload.service';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class CardsPicturesService {
  constructor(private uploadService: UploadService) {}
  backgroundPicture: FileUpload;
  coverPicture: FileUpload;

  buildPicturesName() {
    this.buildBackgroundPicture();
    this.buildCoverPicture();
  }

  buildBackgroundPicture(): void {
    const backgroundPictureExtension = this.uploadService.getFileExtension(
      this.backgroundPicture,
    );
    this.backgroundPicture.filename = this.uploadService.generateFileName(
      backgroundPictureExtension,
    );
  }

  buildCoverPicture(): void {
    this.coverPicture.filename = this.uploadService.generateFileName('png');
  }

  async uploadPictures(): Promise<void> {
    await Promise.all([
      this.uploadBackgroundPicture(),
      this.uploadCoverPicture(),
    ]);
  }

  async uploadBackgroundPicture(): Promise<void> {
    await this.uploadService.uploadFile(
      this.backgroundPicture,
      'cards/background',
    );
  }

  async uploadCoverPicture(): Promise<void> {
    await this.uploadService.uploadFile(this.coverPicture, 'cards/cover');
  }
}
