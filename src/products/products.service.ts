import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  create() {
    return this.productsRepository.createProducts();
  }
  createProduct(product: any) {
    return this.productsRepository.createProduct(product);
  }
  findAll(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  findOne(id: string) {
    return this.productsRepository.getProductById(id);
  }

  async updateImg(id: string, file: Express.Multer.File) {
    const updateProductDto: any = {
      imgUrl: file.path,
    };
    const updateProducts = await this.productsRepository.updateProducts(
      id,
      updateProductDto,
    );
    return updateProducts;
  }
  async update(id: string, updateProductDto: any) {}

  async remove(id: number) {
    const deleteProducts = await this.productsRepository.deleteProducts(id);
    return deleteProducts;
  }
}
