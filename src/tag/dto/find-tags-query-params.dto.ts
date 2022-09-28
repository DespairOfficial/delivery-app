import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindTagParams {
    @IsOptional()
    readonly sortByOrder?: any;

    @IsOptional()
    readonly sortByName?: any;

    @IsString()
    @IsOptional()
    readonly offset?: string;

    @IsString()
    @IsOptional()
    readonly length?: string;
}
