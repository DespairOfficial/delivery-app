import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { TagModule } from './tag/tag.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [
        CacheModule.register({ isGlobal: true }),
        ConfigModule.forRoot({ envFilePath: '.env' }),
        UserModule,
        AuthModule,
        DbModule,
        TagModule,
    ],
    controllers: [],
    providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
})
export class AppModule {}
