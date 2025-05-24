import { Module } from '@nestjs/common';
import { UsersModule } from 'users/users.module';
import { CurrentUserInterceptor } from './current-user.interceptor';

@Module({
  imports: [UsersModule],
  providers: [CurrentUserInterceptor],
  exports: [CurrentUserInterceptor],
})
export class CommonModule {}
