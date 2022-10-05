import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/constants';
import { Tag } from 'src/interfaces/Tag.interface';
import { TagInfo } from 'src/interfaces/TagInfo.interface';
import { User } from 'src/interfaces/User.interface';
import { AddTagsDto } from 'src/user/dto/add-tags.dto';
import { CreateTagQueryDto } from './dto/create-tag-query.dto';
import { FindTagParams } from './dto/find-tags-query-params.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
@Injectable()
export class TagRepository implements IRepository<Tag> {
    constructor(@Inject(PG_CONNECTION) private db: Pool) {}

    async create(tag: CreateTagQueryDto): Promise<Tag> {
        const result = await this.db.query(
            `INSERT INTO public.tag ("creator", "name", "sort_order") VALUES ('${tag.creator}','${tag.name}', '${tag.sort_order}') RETURNING *`,
        );
        return result.rows[0];
    }
    async update(updateTagDto: UpdateTagDto): Promise<Tag> {
        const result = await this.db.query(
            `UPDATE public.tag SET "name" = '${updateTagDto.name}', "sort_order"='${updateTagDto.sort_order}' WHERE "id"='${updateTagDto.id}' RETURNING *`,
        );
        return result.rows[0];
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
    async findManyByCreator(creator: string) {
        const tagsQuery = await this.db.query(
            `SELECT * FROM public.tag WHERE "creator"= '${creator}'`,
        );
        const result = tagsQuery.rows;
        return {
            tags: result,
        };
    }
    async findInfoById(id: string | number): Promise<TagInfo> {
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
        const keys = Object.keys(params);
        if (keys.includes('sortByOrder') || keys.includes('sortByName')) {
            queryParams += 'ORDER BY ';
            if (keys.includes('sortByName')) {
                queryParams += '"name"';
                if (keys.includes('sortByOrder')) {
                    queryParams += ', "sort_order"';
                }
            } else if (keys.includes('sortByOrder')) {
                queryParams += '"sort_order"';
            }
        }
        if (params.length) {
            queryParams += ' LIMIT ' + params.length;
        }
        if (params.offset) {
            queryParams += ' OFFSET ' + params.offset;
        }

        const query =
            'SELECT public.tag.sort_order, public.tag.name, public.user.uid, public.user.nickname, public.tag.id FROM public.tag JOIN public.user ON public.user.uid = public.tag.creator ' +
            queryParams;

        const infoArray = (await this.db.query(query)).rows;

        const data = await Promise.all(
            infoArray.map(async (row) => {
                return await this.findInfoById(row.id);
            }),
        );
        const countQuery =
            'SELECT COUNT(*) FROM public.tag JOIN public.user ON public.user.uid = public.tag.creator';
        const count = (await this.db.query(countQuery)).rows[0].count;
        const meta = {
            offset: params.offset,
            length: params.length,
            quantity: count,
        };
        return { data: data, meta: meta };
    }
    async addManyToUser(uid: string, addTagsDto: AddTagsDto) {
        const tuples = addTagsDto.tags.map((item) => {
            return `('${uid}' , '${item}')`;
        });
        const values = tuples.join(', ');
        const addQuery = `BEGIN; INSERT INTO public.user_tag (user_id, tag_id) VALUES ${values}; COMMIT;`;
        const result = await this.db.query(addQuery);
        return result.rows;
    }
}
