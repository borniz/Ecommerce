import { PickType } from '@nestjs/mapped-types';
import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { MatchPassword } from '../../decorators/mathPassword.decorator';
import { Order } from '../../entities/orders.entity';

export class CreateUserDto {
  @ApiHideProperty()
  id: string;
  @ApiHideProperty()
  orders: Order[];

  /**
   Debe ser un string
   @example pepito
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  /**
   Debe ser un email valido
   @example pepito@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   debe de ser un string de entre 8 y 15 caracteres, con una en mayuscula y con una en minuscula,dabe de tener un caracter special
   @example aaAA##11
   */
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  password: string;

  /**
   Debe ser un string igual al password
   @example aaAA##11
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   Debe ser un string entre 3 y 80 caracteres
   @example calle falsa 123
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;

  /**
   dabe ser un number
   @example 123456789
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   Debe ser un string entre 4 y 20 caracteres
   @example Colombia
   */
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  country: string;

  /**
   Debe ser un string entre 4 y 20 caracteres
   @example Bogota
   */
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;
}
export class LoginUserDto extends PickType(CreateUserDto, [
  /**
   esta es la propiedad email
   @example pepito@gmail.com
   */
  'email',
  /**
   esta es la propiedad password
   @example aaAA##11
   */
  'password',
]) {}
