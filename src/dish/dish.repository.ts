import { PG_CONNECTION } from 'src/constants';
import { Inject } from '@nestjs/common';
import { Dish } from './../interfaces/Dish.interface';
import { Pool } from 'pg';
export class DishRepository implements IRepository<Dish>{
	constructor(@Inject(PG_CONNECTION) private db: Pool){}
	create(item: Object): Promise<Dish> {
		throw new Error('Method not implemented.');
	}
	update(item: Object): Promise<Dish> {
		throw new Error('Method not implemented.');
	}
	deleteById(id: string | number): void {
		throw new Error('Method not implemented.');
	}
	findById(id: string | number): Promise<Dish> {
		throw new Error('Method not implemented.');
	}
	find(): Promise<Dish[]> {
		throw new Error('Method not implemented.');
	}
	async findByRestaurantId(restaurnt_id: number): Promise<Dish[]>{
		const qury = `SELECT id, description, price, image_name, name FROM restaurant_dish 
		JOIN dish ON restaurant_dish.dish_id = dish.id
		WHERE restaurant_dish.restaurant_id = '${restaurnt_id}'`
		const result = await this.db.query(qury)
		return result.rows
	}
	
}