import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagRepository } from './tag.repository';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [DbModule, forwardRef(() => AuthModule), forwardRef(() => UserModule)],
    controllers: [TagController],
    providers: [TagService, TagRepository],
    exports: [TagService],
})
export class TagModule {}
