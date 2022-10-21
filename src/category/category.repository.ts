import { Pool } from 'pg';
import { PG_CONNECTION } from './../constants';
import { Inject } from '@nestjs/common';
import { Category } from 'src/interfaces/Category.interface';

export class CategoryRepository implements IRepository<Category> {
    constructor(@Inject(PG_CONNECTION) private db: Pool) {}
    async create(item: Object): Promise<Category> {
        throw new Error('Method not implemented.');
    }
    async update(item: Object): Promise<Category> {
        throw new Error('Method not implemented.');
    }
    async deleteById(id: string | number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async findById(id: string | number): Promise<Category> {
        const query = await this.db.query(`SELECT id, name, image_name FROM category WHERE id=${id}`);
        const result = query.rows[0];
        return result;
    }
    async find(): Promise<Category[]> {
        const query = await this.db.query(`SELECT id, name, image_name FROM category`);
        const result = query.rows;
        return result;
    }
}
