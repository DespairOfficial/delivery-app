import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/constants';
import { Tag } from 'src/interfaces/Tag.interface';
import { CreateTagQueryDto } from './dto/create-tag-query.dto';

@Injectable()
export class TagRepository implements IRepository<Tag> {
    constructor(@Inject(PG_CONNECTION) private db: Pool) {}

    async create(tag: CreateTagQueryDto): Promise<Tag> {
        const result = await this.db.query(
            `INSERT INTO public.tag ("creator", "name", "sort_order") VALUES ('${tag.creator}','${tag.name}', '${tag.sort_order}') RETURNING *`,
        );
        return result.rows[0];
    }
    async update(tag: CreateTagQueryDto): Promise<Tag> {
        throw new Error('Method not implemented.');
    }
    deleteById(id: number): void {
        throw new Error('Method not implemented.');
    }
    async getByName(name: string) {
        const result = await this.db.query(`SELECT * FROM public.tag WHERE "name" = '${name}'`);
        return result.rows[0];
    }
}
