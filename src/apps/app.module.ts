import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';

@Module({
  imports: [
    PublicModule,
    PrivateModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    RouterModule.register([
      {
        path: '',
        children: [
          {
            path: '/',
            module: PublicModule,
          },
          {
            path: '/private',
            module: PrivateModule,
          },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
