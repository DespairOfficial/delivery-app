import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { TagInfo } from 'src/interfaces/TagInfo.interface';
class MetaQueryInfo {
    @ApiProperty({
        description: 'Offset from 0 to quantity',
        example: '2',
    })
    offset: string;
    @ApiProperty({
        description: 'Length of selection',
        example: '10',
    })
    length: string;
    @ApiProperty({
        description: 'Amout of items found',
        example: '100',
    })
    quantity: string;
}
export class FindTagsResultDto {
    @ApiProperty({
        description: 'Array contains informations about tags, satysfying query params',
        type: [TagInfo],
    })
    data: Array<TagInfo>;
    @ApiProperty({
        description: 'Meta information about result',
        type: MetaQueryInfo,
    })
    meta: MetaQueryInfo;
}
