import { Connection } from 'typeorm';
import { Card } from './entities/card.entity';

export const cardProviders = [
  {
    provide: 'CARDS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Card),
    inject: ['DATABASE_CONNECTION'],
  },
];
