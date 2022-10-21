import { StaticService } from './static.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('static')
export class StaticController {
    constructor(private staticService: StaticService) {}
    @Get(':fn')
    async getStaticFile(@Param('fn') fileName: string) {
		const result = await this.staticService.getStaticFile(fileName);
        return result
    }
}
