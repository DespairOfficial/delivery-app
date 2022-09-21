import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { TagModule } from './tag/tag.module';

@Module({
    imports: [ConfigModule.forRoot({ envFilePath: '.env' }), UserModule, AuthModule, DbModule, TagModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
