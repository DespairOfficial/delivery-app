import { Body, Controller, Post, Get, Req, UseGuards, Query, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Tag } from 'src/interfaces/Tag.interface';
import { CreateTagDto } from './dto/create-tag.dto';
import { FindTagParams } from './dto/find-tags-query-params.dto';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tag')
@UseGuards(JwtAuthGuard)
export class TagController {
    constructor(private tagService: TagService) {}
    @Post()
    createTag(
        @Body() createTagDto: CreateTagDto,
        @Req() request: Request,
    ): Promise<Omit<Tag, 'creator'>> {
        return this.tagService.createTag(createTagDto, request.user.uid);
    }
    @Get(':id')
    getTagInfo(@Param('id') id: string) {
        return this.tagService.getTagInfoById(id);
    }
    @Get()
    getTagWithQueryParams(@Query() query: FindTagParams) {
        return this.tagService.getTagsByQueryParams(query);
    }
    @Put(':id')
    changeTag(
        @Body() createTagDto: CreateTagDto,
        @Req() request: Request,
        @Param('id') id: string,
    ) {
        return this.tagService.changeTag(id, createTagDto, request.user.uid);
    }
}
