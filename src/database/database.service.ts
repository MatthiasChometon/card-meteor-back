import { Connection, createConnection } from 'typeorm';

export class DatabaseService {
  private synchronize: boolean;
  private type: any;
  private port: number;
  private connection: Connection;

  private setConfiguration(): void {
    const port = parseInt(process.env.DATABASE_PORT);
    const synchronize: boolean = process.env.DATABASE_SYNCHRONIZE === 'true';
    const type: any = process.env.DATABASE_TYPE;
    const isSynchronizeABoolean =
      process.env.DATABASE_SYNCHRONIZE === 'true' ||
      process.env.DATABASE_SYNCHRONIZE === 'false';

    if (!port || !isSynchronizeABoolean)
      throw new Error('unvalid database configuration');

    this.synchronize = synchronize;
    this.type = type;
    this.port = port;
  }

  private async setConnection(): Promise<void> {
    this.connection = await createConnection({
      type: this.type,
      host: process.env.DATABASE_HOST,
      port: this.port,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: this.synchronize,
    });
  }

  async connect(): Promise<Connection> {
    this.setConfiguration();
    await this.setConnection();

    return this.connection;
  }
}
