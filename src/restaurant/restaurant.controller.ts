import { RestaurantService } from './restaurant.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('restaurant')
export class RestaurantController {
    constructor(private restaurantService: RestaurantService){}
    @Get()
    async getRestaurants() {
		return await this.restaurantService.getRestaurants() 
	}
	@Get('/featured/:id')
	async getRestaurantsByFeaturedId(@Param('id') featured_id: number) {
		return await this.restaurantService.getByFeaturedId(featured_id)
	}
}
