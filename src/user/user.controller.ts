import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../interfaces/User.interface';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @ApiOperation({ summary: 'Get user info' })
    @ApiResponse({
        status: 200,
        type: [User],
    })
    @Get()
    getUserInfo(@Req() request: Request) {
        return this.userService.getCurrentUserInfo(request.user.email);
    }

    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({
        status: 200,
        type: User,
    })
    @Put()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
    @Delete()
    deleteUser(@Req() request: Request) {
        const result = this.userService.deleteUser(request.user.uid);
        delete request.user;
        return result;
    }
}
