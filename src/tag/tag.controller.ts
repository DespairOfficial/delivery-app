import { Body, Controller, Post, Get, Req, UseGuards, Query, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Tag } from 'src/interfaces/Tag.interface';
import { TagInfo } from 'src/interfaces/TagInfo.interface';
import { CreateTagDto } from './dto/create-tag.dto';
import { FindTagParams } from './dto/find-tags-query-params.dto';
import { FindTagsResultDto } from './dto/find-tags-result.dto';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tag')
@UseGuards(JwtAuthGuard)
export class TagController {
    constructor(private tagService: TagService) {}
    @ApiOperation({ summary: 'Create a tag' })
    @ApiResponse({
        status: 201,
        type: OmitType(Tag, ['creator']),
    })
    @Post()
    async createTag(
        @Body() createTagDto: CreateTagDto,
        @Req() request: Request,
    ): Promise<Omit<Tag, 'creator'>> {
        return this.tagService.createTag(createTagDto, request.user.uid);
    }

    @ApiOperation({ summary: 'Get tag by id' })
    @ApiResponse({
        status: 200,
        type: TagInfo,
    })
    @Get(':id')
    async getTagInfo(@Param('id') id: string) {
        return this.tagService.getTagInfoById(id);
    }

    @ApiOperation({ summary: 'Get tags with query params' })
    @ApiResponse({
        status: 200,
        type: FindTagsResultDto,
    })
    @Get()
    async getTagWithQueryParams(@Query() query: FindTagParams) {
        return this.tagService.getTagsByQueryParams(query);
    }

    @ApiOperation({ summary: 'Update tag by id' })
    @ApiResponse({
        status: 200,
        type: TagInfo,
    })
    @Put(':id')
    async changeTag(
        @Body() createTagDto: CreateTagDto,
        @Req() request: Request,
        @Param('id') id: string,
    ) {
        return this.tagService.changeTag(id, createTagDto, request.user.uid);
    }
}
