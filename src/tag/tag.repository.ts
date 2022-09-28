import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/constants';
import { Tag } from 'src/interfaces/Tag.interface';
import { User } from 'src/interfaces/User.interface';
import { CreateTagQueryDto } from './dto/create-tag-query.dto';
import { FindTagParams } from './dto/find-tags-query-params.dto';

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
    async findById(id: string | number): Promise<Tag> {
        const tagInfoQuery = await this.db.query(`SELECT * FROM public.tag WHERE "id" = '${id}'`);
        const tag: Tag = tagInfoQuery.rows[0];

        return tag;
    }
    async findInfoById(id: string | number) {
        const tagInfoQuery = await this.db.query(`SELECT * FROM public.tag WHERE "id" = '${id}'`);
        const tag: Tag = tagInfoQuery.rows[0];
        const creatorQuery = await this.db.query(
            `SELECT * FROM public.user WHERE "uid"='${tag.creator}'`,
        );
        const creator: User = creatorQuery.rows[0];
        return {
            creator: {
                nickname: creator.nickname,
                uid: creator.uid,
            },
            name: tag.name,
            sort_order: tag.sort_order,
        };
    }
    async findWithParams(params: FindTagParams) {
        let queryParams = '';
        if (params.sortByName || params.sortByOrder) {
            queryParams += 'ORDER BY ';
            if (params.sortByName) {
                queryParams += 'name';
            }
            if (params.sortByOrder) {
                queryParams += 'sort_order';
            }
        }
        if (params.length) {
            queryParams += ' LIMIT ' + params.length;
        }
        if (params.offset) {
            queryParams += ' OFFSET ' + params.offset;
        }
        const query = `SELECT * FROM public.tag` + queryParams;
        const result = await this.db.query(query);
        return params;
    }
}
