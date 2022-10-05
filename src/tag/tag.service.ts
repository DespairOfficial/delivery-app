import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { Tag } from 'src/interfaces/Tag.interface';
import { TagInfo } from 'src/interfaces/TagInfo.interface';
import { AddTagsDto } from 'src/user/dto/add-tags.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { FindTagParams } from './dto/find-tags-query-params.dto';
import { TagRepository } from './tag.repository';
import { UNKOWN_INTERNAL_ERROR, TAGNAME_EXISTS, NO_RIGHTS, WRONG_ARGUMENTS } from '../constants';

@Injectable()
export class TagService {
    constructor(private tagRepository: TagRepository) {}

    async createTag(createTagDto: CreateTagDto, creator: string): Promise<Omit<Tag, 'creator'>> {
        try {
            const candidateTag = await this.tagRepository.getByName(createTagDto.name);

            if (candidateTag) {
                throw new BadRequestException(TAGNAME_EXISTS);
            }

            return this.tagRepository.create({
                creator,
                name: createTagDto.name,
                sort_order: createTagDto.sort_order,
            });
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
    async getTagInfoById(id: string) {
        try {
            return this.tagRepository.findInfoById(id);
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
    async getTagsByQueryParams(params: FindTagParams) {
        try {
            const result = await this.tagRepository.findWithParams(params);
            return result;
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
    async changeTag(id: string, createTagDto: CreateTagDto, creator: string): Promise<TagInfo> {
        try {
            const tagToChange: Tag = await this.tagRepository.findById(id);
            if (tagToChange.creator === creator) {
                if (await this.tagRepository.getByName(createTagDto.name)) {
                    throw new BadRequestException(TAGNAME_EXISTS);
                }
                const updatedTag: Tag = await this.tagRepository.update({ id, ...createTagDto });
                const tagInfo = await this.tagRepository.findInfoById(id);
                return tagInfo;
            }
            throw new ForbiddenException(NO_RIGHTS);
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
    async getUserTags(uid: string) {
        try {
            const result = await this.tagRepository.findManyByCreator(uid);
            return result;
        } catch (error) {
            throw new InternalServerErrorException(UNKOWN_INTERNAL_ERROR);
        }
    }
    async addTagsById(uid: string, addTagsDto: AddTagsDto) {
        try {
            const result = await this.tagRepository.addManyToUser(uid, addTagsDto);
            return result;
        } catch (error) {
            throw new BadRequestException(WRONG_ARGUMENTS);
        }
    }
}
