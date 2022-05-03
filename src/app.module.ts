import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [CardModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
