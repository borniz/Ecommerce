import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  addCtegories() {
    return this.categoriesRepository.addCategories();
  }
  getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
