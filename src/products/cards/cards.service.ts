import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardInput } from './dto/create-card.input';
import { FileUpload } from 'graphql-upload';
import { CardsPicturesService } from './cardsPictures.service';

@Injectable()
export class CardsService {
  constructor(
    @Inject('CARDS_REPOSITORY')
    private cardRepository: Repository<Card>,
    private cardsPicturesService: CardsPicturesService,
  ) {}
  card: Card;

  async create(
    createCardInput: CreateCardInput,
    coverPicture: FileUpload,
    backgroundPicture: FileUpload,
    editor: string,
  ): Promise<Card> {
    this.cardsPicturesService.backgroundPicture = backgroundPicture;
    this.cardsPicturesService.coverPicture = coverPicture;
    this.cardsPicturesService.buildPicturesName();

    const newCard = {
      ...createCardInput,
      editor,
      backgroundPicture: this.cardsPicturesService.backgroundPicture.filename,
      coverPicture: this.cardsPicturesService.coverPicture.filename,
    };
    const [cardCreated] = await Promise.all([
      this.cardRepository.save(newCard),
      this.cardsPicturesService.uploadPictures(),
    ]);
    return cardCreated;
  }

  async findOne(cardInformations: Partial<Card>): Promise<Card | undefined> {
    return await this.cardRepository.findOne({
      where: { ...cardInformations },
    });
  }

  async findOneOrError(cardInformations: Partial<Card>): Promise<Card> {
    const card = await this.findOne(cardInformations);
    if (card === undefined) throw new NotFoundException();
    return card;
  }

  async updateOne(
    cardInformations: Partial<Card>,
    payload: Partial<Card>,
    coverPicture: FileUpload,
    backgroundPicture?: FileUpload,
  ): Promise<Card> {
    this.card = await this.findOneOrError(cardInformations);
    this.cardsPicturesService.coverPicture = coverPicture;
    this.cardsPicturesService.coverPicture.filename = this.card.coverPicture;

    const cardToUpdate = { ...this.card, ...payload };
    const [cardUpdated] = await Promise.all([
      this.cardRepository.save(cardToUpdate),
      this.uploadBackgroundPicture(backgroundPicture),
      this.cardsPicturesService.uploadCoverPicture(),
    ]);
    return cardUpdated;
  }

  private async uploadBackgroundPicture(backgroundPicture: FileUpload) {
    if (backgroundPicture !== undefined) {
      this.cardsPicturesService.backgroundPicture = backgroundPicture;
      this.cardsPicturesService.backgroundPicture.filename =
        this.card.backgroundPicture;
      await this.cardsPicturesService.uploadBackgroundPicture();
    }
  }
}
