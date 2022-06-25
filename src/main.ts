import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';
import { firebaseConfig } from '../firebase';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
  app.use(graphqlUploadExpress());
  app.useStaticAssets(join(__dirname, 'uploads'));
  await app.listen(3000);
}
bootstrap();
