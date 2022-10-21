import { ApiProperty } from '@nestjs/swagger';

export class Restaurant {
    /**
     * Restaurant's unique id
     */
    @ApiProperty({
        example: '1',
        description: 'Id of restaurant in app',
    })
    readonly id: number;

    /**
     * Title of restaurant
     */
    @ApiProperty({
        example: 'Discounts',
        description: 'The title of restaurant',
    })
    readonly name: string;

    /**
     * Short description of restaurant
     */
    @ApiProperty({
        example: 'Very nice discounts',
        description: 'Short description',
    })
    readonly description: string;
	/**
     * Logo, image of restaurant
     */
	 @ApiProperty({
        example: 'logo.jpg',
        description: 'Filename of an restaurants logo',
    })
    readonly image_name: string;
	/**
     * Latitude of restaurant's address
     */
	 @ApiProperty({
        example: '56.1241205',
        description: 'Latitude of restaurants address',
    })
    readonly lat: string;
	/**
     * Longitude of restaurant's address
     */
	 @ApiProperty({
        example: '0.1241205',
        description: 'Longitude of restaurants address',
    })
    readonly long: string;
	/**
     * Restaurant's address
     */
	 @ApiProperty({
        example: 'Main st.1234',
        description: 'Restaurants address',
    })
    readonly address: string;
	/**
     * Rating
     */
	 @ApiProperty({
        example: '3.7',
        description: 'Rating from 1 to 5, double',
    })
    readonly rating: number;
	/**
     * Category id
     */
	 @ApiProperty({
        example: 'Sushi',
        description: 'category_name',
    })
    readonly category_name: string;

}
