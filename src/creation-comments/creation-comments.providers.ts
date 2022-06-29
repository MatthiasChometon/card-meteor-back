import { Connection } from 'typeorm';
import { CreationComment } from './entities/creation-comment.entity';

export const creationCommentProviders = [
  {
    provide: 'CREATION_COMMENT_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(CreationComment),
    inject: ['DATABASE_CONNECTION'],
  },
];
