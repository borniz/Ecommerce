import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly cloudinaryRepository: CloudinaryRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, id: string) {
    const products = await this.productsRepository.findOneBy({ id });
    if (!products) throw new NotFoundException(`Producto ${id} no encotrado`);

    const response = await this.cloudinaryRepository.uploadImage(file);
    await this.productsRepository.update(products.id, {
      imgUrl: response.secure_url,
    });
    const foundproduct = await this.productsRepository.findOneBy({ id });
    return foundproduct;
  }
}
