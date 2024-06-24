import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/orders.entity';
import { OrderRepository } from './orders.repository';
import { Users } from '../entities/users.entity';
import { Products } from '../entities/products.entity';
import { OrderDetails } from 'src/entities/orderdetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetails, Users, Products])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
