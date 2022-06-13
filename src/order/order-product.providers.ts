import { Connection } from 'typeorm';
import { OrderProduct } from './entities/order-product.entity';

export const orderProductProviders = [
  {
    provide: 'ORDER_PRODUCTS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(OrderProduct),
    inject: ['DATABASE_CONNECTION'],
  },
];
