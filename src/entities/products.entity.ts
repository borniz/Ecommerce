import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { OrderDetails } from './orderdetails.entity';

@Entity({
  name: 'PRODUCTS',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  /**
   * Debe ser un string max de 50 caracteres
   * @example pepito
   */
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  /**
   * Debe ser un string
   * @example description
   */
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  /**
   * Debe ser un decimal de max 10 caracteres y 2 decimales
   * @example 1000.00
   */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  /**
   * Debe ser un numero entero
   * @example 123
   */
  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  /**
   * Debe ser un Url para la imagen
   * @example https://www.shutterstock.com/image-vector/strikethrough-camera-icon-disabled-photography-260nw-2320765013.jpg
   */
  @Column({
    type: 'text',
    default:
      'https://www.shutterstock.com/image-vector/strikethrough-camera-icon-disabled-photography-260nw-2320765013.jpg',
  })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToMany(() => OrderDetails, (orderdetail) => orderdetail.products)
  orderDetails: OrderDetails;
}
