import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UploadService } from '../../upload/upload.service';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardInput } from './dto/create-card.input';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class CardsService {
  constructor(
    @Inject('CARDS_REPOSITORY')
    private cardRepository: Repository<Card>,
    private uploadService: UploadService,
  ) {}
  backgroundPicture: FileUpload;
  coverPicture: FileUpload;
  createCardInput: CreateCardInput;
  newCard: Partial<Card>;

  async create(
    createCardInput: CreateCardInput,
    coverPicture: FileUpload,
    backgroundPicture: FileUpload,
  ): Promise<Card> {
    this.createCardInput = createCardInput;
    this.buildPictures(backgroundPicture, coverPicture);
    const [cardCreated] = await Promise.all([
      this.cardRepository.save(this.newCard),
      this.uploadPictures(),
    ]);
    return cardCreated;
  }

  buildPictures(backgroundPicture: FileUpload, coverPicture: FileUpload) {
    this.backgroundPicture = backgroundPicture;
    this.coverPicture = coverPicture;
    this.buildPicturesName();
    this.newCard = {
      ...this.createCardInput,
      backgroundPicture: this.backgroundPicture.filename,
      coverPicture: this.coverPicture.filename,
    };
  }

  private buildPicturesName() {
    const backgroundPictureExtension = this.uploadService.getFileExtension(
      this.backgroundPicture,
    );
    this.backgroundPicture.filename = this.uploadService.generateFileName(
      backgroundPictureExtension,
    );
    this.coverPicture.filename = this.uploadService.generateFileName('svg');
  }

  private async uploadPictures() {
    await Promise.all([
      this.uploadService.uploadFile(this.backgroundPicture, 'background'),
      this.uploadService.uploadFile(this.coverPicture, 'cover'),
    ]);
  }

  async findOne(cardInformations: Partial<Card>): Promise<Card> {
    return await this.cardRepository.findOne({
      where: { ...cardInformations },
    });
  }

  async updateOne(id: number, payload: Partial<Card>): Promise<Card> {
    const card = await this.findOne({ id });

    if (!card) throw new UnauthorizedException('Card not exist');

    const cardUpdated = { ...card, ...payload };
    return await this.cardRepository.save(cardUpdated);
  }
}
