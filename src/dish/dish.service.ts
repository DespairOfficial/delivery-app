import { DishRepository } from './dish.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DishService {
	constructor( private dishRepository:DishRepository){}
	getDishesByRestaurantId(restaurantId: number){
		return this.dishRepository.findByRestaurantId(restaurantId)
	}
}
