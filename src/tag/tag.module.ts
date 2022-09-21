import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagRepository } from './tag.repository';

@Module({
    imports: [DbModule, forwardRef(() => AuthModule)],
    controllers: [TagController],
    providers: [TagService, TagRepository],
})
export class TagModule {}
