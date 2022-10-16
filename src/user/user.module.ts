import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DbModule } from '../db/db.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository],
    imports: [forwardRef(() => AuthModule), DbModule],
    exports: [UserService],
})
export class UserModule {}
