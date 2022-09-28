import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Token } from 'src/interfaces/Token.interface';
import { Tokens } from 'src/interfaces/Tokens.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInUserDto } from 'src/user/dto/signin-user.dto';
import { AuthService } from './auth.service';
import { TOKEN_OBJECT_EXAMPLE } from '../constants';

@ApiTags('Authentication')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}
    @ApiOperation({ summary: 'Sign in/Log in' })
    @ApiResponse({
        status: 200,
        schema: {
            example: TOKEN_OBJECT_EXAMPLE,
        },
    })
    @Post('signin')
    async signIn(@Body() userDto: SignInUserDto) {
        return await this.authService.signIn(userDto);
    }

    @ApiOperation({ summary: 'Signing up/registration ' })
    @ApiResponse({
        status: 200,
        schema: {
            example: TOKEN_OBJECT_EXAMPLE,
        },
    })
    @Post('signup')
    async signUp(@Body() userDto: CreateUserDto) {
        const tokens = await this.authService.signUp(userDto);
        return tokens;
    }

    @ApiOperation({ summary: 'Log out' })
    @Post('logout')
    logout() {}

    @ApiOperation({ summary: 'Get refresh token' })
    @Post('refresh-token')
    async refreshToken(@Req() request: Request) {
        const cookies = request.cookies;
        const refreshToken: Token = { token: cookies.refreshToken };
        const tokens: Tokens = await this.authService.refresh(refreshToken);
        return tokens;
    }
}
