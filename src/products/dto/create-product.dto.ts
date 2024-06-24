import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  /**
       Propiedad  name
       @example   Product
     */
  @IsNotEmpty()
  name: string;
  /**
       Propiedad  description
       @example   descripcion Product
     */
  @IsNotEmpty()
  description: string;

  /**
       Propiedad  price
       @example   100.00
     */
  @IsNotEmpty()
  price: number;
  /**
       Propiedad  stock
       @example  100
     */
  @IsNotEmpty()
  stock: number;
  /**
       Propiedad  imgUrl
       @example  https://www.shutterstock.com/image-vector/strikethrough-camera-icon-disabled-photography-260nw-2320765013.jpg
     */
  @IsNotEmpty()
  imgUrl: string;
  /**
       Propiedad  category
       @example  Electronics
     */
  @IsNotEmpty()
  category: string;
}
