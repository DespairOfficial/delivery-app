import { DishService } from './dish.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('dish')
export class DishController {
    constructor(private dishService: DishService) {}
    @Get('/restaurant/:restaurant_id')
    getByRestaurantId(@Param('restaurant_id') restaurant_id: number) {
        return this.dishService.getDishesByRestaurantId(restaurant_id)
    }
}
