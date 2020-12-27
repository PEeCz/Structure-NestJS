import { HttpModule, Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
// import { FacebookStrategy } from './facebook.strategy';
// import { GoogleStrategy } from './google.strategy';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
// import { FacebookAccessTokenStrategy } from './facebook-access-token.strategy';
// import { GoogleAccessTokenStrategy } from './google-access-token.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AccountModule,
    HttpModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '7d' },
      }),
    })],
  providers: [
    AuthenticationService,
    JwtStrategy,
    // FacebookStrategy,
    // FacebookAccessTokenStrategy,
    // GoogleStrategy,
    // GoogleAccessTokenStrategy,
  ],
  controllers: [AuthenticationController],
  exports: [
    AuthenticationService,
    JwtStrategy,
  ],
})
export class AuthenticationModule {
}
