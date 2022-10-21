import { CategoryRepository } from './category.repository';
import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, CategoryRepository],
    imports: [DbModule],
})
export class CategoryModule {}
