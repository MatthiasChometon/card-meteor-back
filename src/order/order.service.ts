import { Inject, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ProductInput } from './types/product-input';
import { OrderProduct } from './entities/order-product.entity';
import { Card } from '../products/cards/entities/card.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDERS_REPOSITORY')
    private orderRepository: Repository<Order>,
    @Inject('ORDER_PRODUCTS_REPOSITORY')
    private orderProductRepository: Repository<OrderProduct>,
  ) {}
  order: Order;
  productInputs: ProductInput[];
  userId: number;

  async create(productInputs: ProductInput[], userId: number): Promise<Order> {
    this.productInputs = productInputs;
    this.userId = userId;
    this.buildOrder();
    await this.save();
    await this.buildOrderProducts();
    return this.order;
  }

  private async save(): Promise<void> {
    this.order = await this.orderRepository.save(this.order);
  }

  private buildOrder(): void {
    this.order = new Order();
    this.buildPrices();
    this.buildTrackingNumber();
    this.buildDeliveryDate();
    this.buildBuyer();
  }

  private buildBuyer(): void {
    const user = new User();
    user.id = this.userId;
    this.order.buyer = user;
  }

  private buildPrices(): void {
    this.order.shippingCostPrice = 4;
    this.computeProductsPrice();
    this.computeTotalPrice();
  }

  private computeProductsPrice(): void {
    this.order.productsPrice = this.productInputs.reduce(
      (total, product) => total + product.number * product.price,
      0,
    );
  }

  private computeTotalPrice(): void {
    this.order.totalPrice =
      this.order.productsPrice + this.order.shippingCostPrice;
  }

  private async buildOrderProducts(): Promise<void> {
    const newProductInputs = this.productInputs.map((productInput) =>
      this.buildOrderProduct(productInput),
    );
    const productInputs = await this.orderProductRepository.save(
      newProductInputs,
    );
    this.order.orderProducts = productInputs;
  }

  private buildOrderProduct(productInput: ProductInput): OrderProduct {
    const orderProduct = new OrderProduct();
    orderProduct.number = productInput.number;
    orderProduct.order = this.order;
    const product = new Card();
    product.id = productInput.id;
    orderProduct.product = product;

    return orderProduct;
  }

  private buildTrackingNumber(): void {
    const now = new Date();
    this.order.trackingNumber = `${Math.random() * now.getTime()}`;
  }

  private buildDeliveryDate(): void {
    const date = new Date(Date.now() + 600000000);
    this.order.deliveryDate = date;
  }
}
