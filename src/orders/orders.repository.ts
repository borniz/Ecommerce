import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/orders.entity';
import { Products } from '../entities/products.entity';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/entities/orderdetails.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderDetails)
    private orderDetailRepository: Repository<OrderDetails>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async addOrder(userId: string, products: any) {
    let total = 0;

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    const order = new Order();
    order.date = new Date();
    order.users = user;

    const newOrder = await this.orderRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (product) => {
        const newProduct = await this.productsRepository.findOneBy({
          id: product.id,
        });

        if (newProduct.stock >= 0) {
          if (!newProduct) {
            throw new NotFoundException(
              `Producto con id ${product.id} no encontrado`,
            );
          }

          total += Number(newProduct.price);

          await this.productsRepository.update(
            { id: newProduct.id },
            { stock: newProduct.stock - 1 },
          );
          return newProduct;
        } else {
          throw new NotFoundException(
            `Producto con id ${newProduct.id} se agoto`,
          );
        }
      }),
    );
    const orderDetails = new OrderDetails();
    orderDetails.price = Number(Number(total).toFixed(2));
    orderDetails.products = productsArray;
    orderDetails.order = newOrder;
    await this.orderDetailRepository.save(orderDetails);

    return await this.orderRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  getOrder(id: string) {
    const order = this.orderRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Orden con id ${id} no encontrada`);
    }
    return order;
  }
}
