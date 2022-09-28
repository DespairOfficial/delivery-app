import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../interfaces/User.interface';
import { UserRepository } from './user.repository';
import { Token } from 'src/interfaces/Token.interface';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async findById(uid: string): Promise<User> {
        try {
            return this.userRepository.findById(uid);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error);
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            return this.userRepository.findByEmail(email);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error);
        }
    }
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            return this.userRepository.create(createUserDto);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error);
        }
    }
    async getCurrentUserInfo(email: string) {
        try {
            return this.userRepository.getUserInfo(email);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error);
        }
    }
    async setNewRefreshToken(uid: string, new_token: Token) {
        try {
            const newToken = await this.userRepository.setRefreshToken(uid, new_token);
            return newToken;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    async findByRefreshToken(refreshToken: Token): Promise<User> {
        try {
            return this.userRepository.getByRefreshToken(refreshToken);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error);
        }
    }
    async deleteUser(uid: string) {
        try {
            return this.userRepository.deleteById(uid);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
