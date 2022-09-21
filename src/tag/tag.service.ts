import { BadRequestException, Injectable } from '@nestjs/common';

import { Tag } from 'src/interfaces/Tag.interface';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
    constructor(private tagRepository: TagRepository) {}

    async createTag(createTagDto: CreateTagDto, creator: string): Promise<Omit<Tag, 'creator'>> {
        const candidateTag = this.tagRepository.getByName(createTagDto.name);
        if (candidateTag) {
            throw new BadRequestException('Tag with this name already exists');
        }
        return this.tagRepository.create({
            creator,
            name: createTagDto.name,
            sort_order: createTagDto.sort_order,
        });
    }
}
