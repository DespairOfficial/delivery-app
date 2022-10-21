import { Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/constants';
import { Restaurant } from './../interfaces/Restaurant.interface';
export class RestaurantRepository implements IRepository<Restaurant> {
	constructor(@Inject(PG_CONNECTION) private db: Pool ){}
	create(item: Object): Promise<Restaurant> {
		throw new Error('Method not implemented.');
	}
	update(item: Object): Promise<Restaurant> {
		throw new Error('Method not implemented.');
	}
	deleteById(id: string | number): void {
		throw new Error('Method not implemented.');
	}
	findById(id: string | number): Promise<Restaurant> {
		throw new Error('Method not implemented.');
	}
	async find(): Promise<Restaurant[]> {
		const query  = await this.db.query(`SELECT * FROM public.restaurant`)
		const result: Restaurant[] = query.rows
		return result
	}
	async findByFeaturedId(featured_id: number): Promise<Restaurant[]>{
		const query = await this.db.query(`SELECT restaurant.id,restaurant.name, restaurant.description, restaurant.image_name, lat, long, address, rating, category.name as category_name FROM featured_restaurant JOIN restaurant ON featured_restaurant.restaurant_id = restaurant.id JOIN category ON restaurant.category_id  = category.id WHERE featured_restaurant.featured_id = ${featured_id}`)
		return query.rows
	}
	
}
