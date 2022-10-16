import { DbModule } from './../db/db.module';
import { Module } from '@nestjs/common';
import { FeaturedController } from './featured.controller';
import { FeaturedService } from './featured.service';
import { FeaturedRepository } from './featured.repository';

@Module({
  controllers: [FeaturedController],
  providers: [FeaturedService, FeaturedRepository],
  imports: [DbModule ]
})
export class FeaturedModule {}
