import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({
  name: 'CATEGORIES',
})
export class Categories {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: number;
  /**
   * Debe ser un string
   * @example category
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => Products, (Product) => Product.category)
  @JoinColumn()
  products: Products[];
}
