import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './orders.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({
  name: 'USERS',
})
export class Users {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Debe ser un string
   * @example pepito
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  /**
   * Debe ser un email valido
   * @example pepito@gmail.com
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  /**
   * Debe tener minimo 8 a 15 caracteres, debe ser una en mayuscula y una minuscula, Debe de tener un caracter especial
   * @example aaBB55$$
   */
  @Column({
    type: 'varchar',
    length: 76,
    nullable: false,
  })
  password: string;

  /**
   * Debe ser un numero entero
   * @example 132456789
   */
  @Column({
    type: 'int',
  })
  phone: number;

  /**
   * Debe ser un string de max 50 caracteres
   * @example pais
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  country: string;

  /**
   * Debe ser un string
   * @example cll falsa 1234
   */
  @Column({
    type: 'text',
  })
  address: string;

  /**
   * Debe ser un string
   * @example city example
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  city: string;

  @ApiHideProperty()
  @Column({
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.users)
  @JoinColumn()
  orders: Order[];
}
