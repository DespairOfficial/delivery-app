import { ApiProperty } from '@nestjs/swagger';

export class Category {
    /**
     * Category's unique id
     */
    @ApiProperty({
        example: '1',
        description: 'Id of category',
    })
    readonly id: string;

    /**
     * Title of featured
     */
    @ApiProperty({
        example: 'Discounts',
        description: 'The title of category, will be shown on main page',
    })
    readonly name: string;

    /**
     * Image of category
     */
    @ApiProperty({
        example: '/xffd8',
        description: 'Image of category, stores in base64',
    })
    readonly image_name: string;
}
