import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { OrderDetails } from './orderdetails.entity';

@Entity({
  name: 'ORDERS',
})
export class Order {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Debe ser una fecha
   * @example dd/mm/aaaa
   */
  @Column()
  date: Date;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'users_id' })
  users: Users;

  @OneToOne(() => OrderDetails, (orderdetail) => orderdetail.order)
  orderDetails: OrderDetails;
}
