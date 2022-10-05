import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../interfaces/User.interface';
import { UserService } from './user.service';
import { TagService } from 'src/tag/tag.service';
import { AddTagsDto } from './dto/add-tags.dto';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService, private tagService: TagService) {}
    @ApiOperation({ summary: 'Get user info' })
    @ApiResponse({
        status: 200,
        type: User,
    })
    @Get()
    async getUserInfo(@Req() request: Request) {
        return this.userService.getCurrentUserInfo(request.user.email);
    }

    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({
        status: 200,
        type: User,
    })
    @Put()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
    @Delete()
    async deleteUser(@Req() request: Request) {
        const result = this.userService.deleteUser(request.user.uid);
        delete request.user;
        return result;
    }
    @Get('tag/my')
    async getOwnTags(@Req() request: Request) {
        return this.tagService.getUserTags(request.user.uid);
    }
    @Post('tag')
    async addTagsToUser(@Req() request: Request, @Body() addTagsDto: AddTagsDto) {
        return this.tagService.addTagsById(request.user.uid, addTagsDto);
    }
}
