import { DatabaseService } from '../../src/database/database.service';

describe('database service', () => {
  describe('connect', () => {
    describe('with unvalid port', () => {
      beforeEach(() => {
        process.env.DATABASE_PORT = 'unvalid port';
      });

      it('throws error', async () => {
        const databaseService = new DatabaseService();
        await expect(databaseService.connect()).rejects.toThrowError(
          'unvalid database configuration',
        );
      });
    });

    describe('with unvalid synchronize', () => {
      beforeEach(() => {
        process.env.DATABASE_SYNCHRONIZE = 'unvalid synchronize';
      });

      it('throws error', async () => {
        const databaseService = new DatabaseService();
        await expect(databaseService.connect()).rejects.toThrowError(
          'unvalid database configuration sdsd',
        );
      });
    });
  });
});
