import { CategoryRepository } from './category.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) {}
    async getCategories() {
        return await this.categoryRepository.find();
    }
    async getCategoryById(id: number) {
        return await this.categoryRepository.findById(id);
    }
}
