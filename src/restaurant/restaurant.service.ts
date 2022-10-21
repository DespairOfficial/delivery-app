import { RestaurantRepository } from './restaurant.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantService {
	constructor(private restaurantRepository: RestaurantRepository){}
	async getRestaurants(){
		return this.restaurantRepository.find()
	}
	async getByFeaturedId(featured_id: number){
		const restaurant = this.restaurantRepository.findByFeaturedId(featured_id)
		return restaurant
	}
}
