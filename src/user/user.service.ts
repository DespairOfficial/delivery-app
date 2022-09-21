import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../interfaces/User.interface';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/constants';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getUserByEmail(email: string): Promise<User> {
        try {
            return this.userRepository.getByEmail(email);
        } catch (error) {
            console.log(error);
        }
    }
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            return this.userRepository.create(createUserDto);
        } catch (error) {
            console.log(error);
        }
    }
    async getCurrentUserInfo(email: string) {
        try {
            return this.userRepository.getUserInfo(email);
        } catch (error) {
            console.log(error);
        }
    }
}
