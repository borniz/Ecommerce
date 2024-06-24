import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { Order } from './orders.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERDETAILS',
})
export class OrderDetails {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Debe ser un decimal con 2 decimales
   * @example 100.00
   */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @ManyToMany(() => Products)
  @JoinTable({
    name: 'ORDERDETAILS_PRODUCTS',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'id',
    },
  })
  products: Products[];

  @OneToOne(() => Order, (orde) => orde)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
