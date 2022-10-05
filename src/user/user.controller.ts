import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../interfaces/User.interface';
import { UserService } from './user.service';
import { TagService } from 'src/tag/tag.service';
import { AddTagsDto } from './dto/add-tags.dto';
import { UserInfo } from 'src/interfaces/UserInfo.interface';
import { Tag } from 'src/interfaces/Tag.interface';
import { UserAddedTagsDto } from './dto/user-added-tags.dto';
import { request } from 'http';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService, private tagService: TagService) {}
    @ApiOperation({ summary: 'Get user info' })
    @ApiResponse({
        status: 200,
        type: UserInfo,
    })
    @Get()
    async getUserInfo(@Req() request: Request): Promise<UserInfo> {
        return this.userService.getCurrentUserInfo(request.user.uid);
    }

    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({
        status: 200,
        type: OmitType(User, ['uid', 'password']),
    })
    @Put()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
    @ApiOperation({ summary: 'Delete a user' })
    @Delete()
    async deleteUser(@Req() request: Request) {
        const result = this.userService.deleteUser(request.user.uid);
        delete request.user;
        return result;
    }
    @ApiOperation({ summary: 'Get tags, created by user' })
    @ApiResponse({
        status: 200,
        type: UserAddedTagsDto,
    })
    @Get('tag/my')
    async getOwnTags(@Req() request: Request) {
        return this.tagService.getUserTags(request.user.uid);
    }

    @ApiOperation({ summary: 'Add tags to user by their ids' })
    @ApiResponse({
        status: 201,
        type: UserAddedTagsDto,
    })
    @Post('tag')
    async addTagsToUser(@Req() request: Request, @Body() addTagsDto: AddTagsDto) {
        return this.tagService.addTagsByIds(request.user.uid, addTagsDto);
    }
    @ApiOperation({ summary: 'Remove added tag from list by id ' })
    @ApiResponse({
        status: 200,
        type: UserAddedTagsDto,
    })
    @Delete('tag/:id')
    async deleteAddedTag(@Param('id') id: string, @Req() request: Request) {
        return await this.tagService.removeAddedTagById(request.user.uid, id);
    }
}
