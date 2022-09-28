import { Tag } from './Tag.interface';

export class UserInfo {
    readonly email: string;
    readonly nickname: string;
    readonly tags: Omit<Tag, 'creator'>[];
}
