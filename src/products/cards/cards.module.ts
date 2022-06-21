import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsResolver } from './cards.resolver';
import { cardProviders } from './cards.providers';
import { DatabaseModule } from '../../database/database.module';
import { CardsListService } from './cardsList.service';
import { UploadService } from '../../upload/upload.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    CardsResolver,
    CardsService,
    ...cardProviders,
    CardsListService,
    UploadService,
  ],
})
export class CardsModule {}
