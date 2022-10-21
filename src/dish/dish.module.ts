import { DbModule } from './../db/db.module';
import { DishRepository } from './dish.repository';
import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';

@Module({
  controllers: [DishController],
  providers: [DishService, DishRepository],
  imports: [DbModule]
})
export class DishModule {}
