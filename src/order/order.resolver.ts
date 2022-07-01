import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetOrdersInput } from './dto/get-orders.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @Context() context,
  ): Promise<Order> {
    return this.orderService.create(
      createOrderInput.products,
      context.req.user.id,
    );
  }

  @Query(() => [Order])
  @UseGuards(JwtAuthGuard)
  userOrders(
    @Args('getOrdersInput') getOrdersInput: GetOrdersInput,
    @Context() context,
  ): Promise<Order[]> {
    const userId = context.req.user.id;
    return this.orderService.findUserOrders(getOrdersInput, userId);
  }
}
