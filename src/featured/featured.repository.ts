import { Pool } from 'pg';
import { PG_CONNECTION } from './../constants';
import { Inject, Injectable } from '@nestjs/common';
import { Featured } from 'src/interfaces/Featured.interface';

@Injectable()
export class FeaturedRepository implements IRepository<Featured>{
	constructor(@Inject(PG_CONNECTION) private db: Pool ){}
	create(item: Object): Promise<Featured> {
		throw new Error('Method not implemented.');
	}
	update(item: Object): Promise<Featured> {
		throw new Error('Method not implemented.');
	}
	deleteById(id: string | number): void {
		throw new Error('Method not implemented.');
	}
	findById(id: string | number): Promise<Featured> {
		throw new Error('Method not implemented.');
	}
	async find(): Promise<Featured[]> {
		const query =  await this.db.query(`SELECT * FROM featured`)
		const result: Featured[] = query.rows
		return result
	}

}