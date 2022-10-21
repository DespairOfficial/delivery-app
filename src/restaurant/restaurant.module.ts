import { DbModule } from './../db/db.module';
import { RestaurantRepository } from './restaurant.repository';
import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantRepository],
  imports: [DbModule]
})
export class RestaurantModule {}
