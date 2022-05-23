import { DatabaseService } from './database.service';

const databaseService = new DatabaseService();

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await databaseService.connect(),
  },
];
