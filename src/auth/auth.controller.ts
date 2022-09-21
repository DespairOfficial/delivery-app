import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInUserDto } from 'src/user/dto/signin-user.dto';
import { AuthService } from './auth.service';
const TOKEN_EXAMPLE =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IiJ9.eyJzdWIiOiIiLCJuYW1lIjoiIiwiaWF0IjoxMjAzMjN9.13hSdKXX8nSdbb7MnPjbIVMxp3r2jzNEaMs0r06pJsY';
@ApiTags('Authentication')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}
    @ApiOperation({ summary: 'Sign in/Log in' })
    @ApiResponse({
        status: 200,
        schema: {
            example: TOKEN_EXAMPLE,
        },
    })
    @Post('signin')
    signIn(@Body() userDto: SignInUserDto) {
        return this.authService.signIn(userDto);
    }

    @ApiOperation({ summary: 'Signing up/registration ' })
    @ApiResponse({
        status: 200,
        schema: {
            example: {
                token: TOKEN_EXAMPLE,
            },
        },
    })
    @Post('signup')
    signUp(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto);
    }

    @ApiOperation({ summary: 'Log out' })
    @Post('logout')
    logout() {}

    @ApiOperation({ summary: 'Log out' })
    @Get('refresh_token')
    logout() {}
}
