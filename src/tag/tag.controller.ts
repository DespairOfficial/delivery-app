import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
@UseGuards(JwtAuthGuard)
export class TagController {
    constructor(private tagService: TagService) {}
    @Post()
    createTag(@Body() createTagDto: CreateTagDto, @Req() request: Request) {
        return this.tagService.createTag(createTagDto, request.user.uid);
    }
}
