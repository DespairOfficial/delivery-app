import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/interfaces/User.interface';
import { SignInUserDto } from 'src/user/dto/signin-user.dto';
import { Token } from 'src/interfaces/Token.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    private generateAccessToken(user: User): Token {
        const payload = { uid: user.uid, email: user.email, nickname: user.nickname };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private generateRefreshToken() {
        const payload = {
            id: uuidv4(),
            type: 'refresh_token',
        };
        return {
            id: payload.id,
            token: this.jwtService.sign(payload, {
                secret: process.env.SECRET || 'refresh_token_secret_8a1lma@#$!ds_15',
                expiresIn: '3d',
            }),
        };
    }
    private setNewRefreshToken(user_uid: string, refresh_token: string) {}
    private async validateUser(userDto: SignInUserDto): Promise<User> {
        try {
            const user = await this.userService.getUserByEmail(userDto.email);
            if (user) {
                const passwordPassed = await bcrypt.compare(userDto.password, user.password);
                if (passwordPassed) {
                    return user;
                }
            }
            throw new UnauthorizedException({
                message: 'Wrong email or password',
            });
        } catch (error) {
            throw error;
        }
    }
    async signIn(userDto: SignInUserDto): Promise<Token> {
        const user: User = await this.validateUser(userDto);
        return this.generateAccessToken(user);
    }
    async signUp(userDto: CreateUserDto): Promise<Token> {
        try {
            const candidate: User = await this.userService.getUserByEmail(userDto.email);
            if (candidate) {
                throw new BadRequestException('User with this email already exists');
            }
            const hashedPassword = await bcrypt.hash(userDto.password, 7);
            const user: User = await this.userService.createUser({
                ...userDto,
                password: hashedPassword,
            });
            return this.generateAccessToken(user);
        } catch (error) {
            throw error;
        }
    }
    async logout() {}
}
