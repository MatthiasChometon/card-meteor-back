import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
  const firebaseConfig = {
    projectId: process.env.PROJECT_ID,
    privateKey,
    clientEmail: process.env.CLIENT_EMAIL,
  };
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(graphqlUploadExpress());
  app.useStaticAssets(join(__dirname, 'uploads'));
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
  });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
