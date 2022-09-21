import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/constants';
import { User } from 'src/interfaces/User.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository implements IRepository<User> {
    constructor(@Inject(PG_CONNECTION) private db: Pool) {}
    async create(createUserDto: CreateUserDto): Promise<User> {
        const createUserQuery = `INSERT INTO public.user (email,nickname,password) VALUES ('${createUserDto.email}', '${createUserDto.nickname}', '${createUserDto.password}') RETURNING *`;

        const result = await this.db.query(createUserQuery);
        const user: User = result.rows[0];
        return user;
    }

    async update(item: CreateUserDto): Promise<User> {
        throw new Error('Method not implemented.');
    }
    async deleteById(id: string | number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async getUserInfo(email: string): Promise<User> {
        const userInfoQuery = `SELECT email,nickname FROM public.user WHERE "email" ='${email}' `;
        const res = await this.db.query(userInfoQuery);
        const userInfo: User = res.rows[0];
        return userInfo;
    }
    async getByEmail(email: string) {
        const getUserQuery = `SELECT * FROM public.user WHERE "email" ='${email}' `;
        const result = await this.db.query(getUserQuery);
        const user: User = result.rows[0];
        return user;
    }
}
