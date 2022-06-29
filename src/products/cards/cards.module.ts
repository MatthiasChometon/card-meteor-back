import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsResolver } from './cards.resolver';
import { cardProviders } from './cards.providers';
import { DatabaseModule } from '../../database/database.module';
import { CardsListService } from './cardsList.service';
import { UploadService } from '../../upload/upload.service';
import { CardsPicturesService } from './cardsPictures.service';
import { UsersService } from '../../users/users.service';
import { userProviders } from 'src/users/users.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    CardsResolver,
    CardsPicturesService,
    CardsService,
    ...cardProviders,
    ...userProviders,
    CardsListService,
    UploadService,
    UsersService,
  ],
})
export class CardsModule {}
