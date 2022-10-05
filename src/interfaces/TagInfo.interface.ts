import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { User } from './User.interface';

export class TagInfo {
    @ApiProperty({
        description: "Uid of  tag's creator",
        type: PickType(User, ['nickname', 'uid']),
    })
    readonly creator: Pick<User, 'nickname' | 'uid'>;
    @ApiProperty({
        example: 'Best tag#1',
        description: 'Title of tag, not longer, than 40 symbols',
    })
    @IsString({ message: 'Must be string' })
    @Length(0, 40, {
        message: 'Can not be longer than 40 symbols',
    })
    readonly name: string;
    @IsString({ message: 'Must be string' })
    @ApiProperty({
        example: '0',
        description: 'Sort order of tag',
    })
    readonly sort_order: number;
}
