import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { DatabaseModule } from '../database/database.module';
import { orderProviders } from './order.providers';
import { orderProductProviders } from './order-product.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    OrderResolver,
    OrderService,
    ...orderProviders,
    ...orderProductProviders,
  ],
})
export class OrderModule {}
