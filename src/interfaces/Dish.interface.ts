import { ApiProperty } from '@nestjs/swagger';

export class Dish {
    /**
     * Dish's unique id
     */
    @ApiProperty({
        example: '1',
        description: 'Id of dish',
    })
    readonly id: number;

    /**
     * Title of a dish
     */
    @ApiProperty({
        example: 'Cheese pizza',
        description: 'The title of dish',
    })
    readonly name: string;
    /**
     * Description of a dish
     */
    @ApiProperty({
        example: 'This is pizza with four types of cheese. This one is very good',
        description: 'Description of a dish',
    })
    readonly description: string;
    /**
     * Price of a dish
     */
    @ApiProperty({
        example: 4.8,
        description: "Price of a dish (in USD)",
    })
    readonly price: number;
    /**
     * Image of a dish
     */
    @ApiProperty({
        example: 'img.jpg',
        description: "Image's filename",
    })
    readonly image_name: string;
}
