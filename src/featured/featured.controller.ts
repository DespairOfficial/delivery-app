import { FeaturedService } from './featured.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Featured } from 'src/interfaces/Featured.interface';

@ApiTags('Featured')
@Controller('featured')
export class FeaturedController {
	constructor(private featuredService: FeaturedService){}
    @ApiOperation({ summary: 'List of all featured' })
    @ApiResponse({
        status: 200,
        type: Array<Featured>,
    })
    @Get()
    async getFeatured() {
        return await this.featuredService.getFeatured();
    }
}
