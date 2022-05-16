import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const { synchronize, type, port } = verifyConfiguration();

      return await createConnection({
        type,
        host: process.env.DATABASE_HOST,
        port,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize,
      });
    },
  },
];

function verifyConfiguration(): {
  synchronize: boolean;
  type: any;
  port: number;
} {
  const port = parseInt(process.env.DATABASE_PORT);
  const synchronize: boolean = process.env.DATABASE_SYNCHRONIZE === 'true';
  const type: any = process.env.DATABASE_TYPE;
  const isSynchronizeNotABoolean =
    process.env.DATABASE_SYNCHRONIZE !== ('true' || 'false');

  if (!port || isSynchronizeNotABoolean)
    throw new Error('unvalid database configuration');

  return { synchronize, type, port };
}
