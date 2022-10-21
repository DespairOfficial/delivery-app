import { CategoryService } from './category.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}
    @Get()
    getCategories() {
        return this.categoryService.getCategories();
    }
	@Get('/:id')
	getCategoryById(@Param('id') id: number){
		return this.categoryService.getCategoryById(id)
	}
}
