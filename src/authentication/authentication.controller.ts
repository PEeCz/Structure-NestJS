import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {

  constructor(private readonly authentication: AuthenticationService) {
  }

  @Post('sign-in')
  @ApiBody({ type : SignInDto })
  async signin(@Body() dto: SignInDto) {
    return this.authentication.signin(dto);
  }

  // @Get('facebook-token')
  // @UseGuards(AuthGuard('facebook-token'))
  // @ApiParam({
  //   name: 'access_token',
  //   required: true,
  // })
  // async facebookToken(@Req() req) {
  //   return this.authentication.social(req.user);
  // }

  // @Get('/facebook')
  // @UseGuards(AuthGuard('facebook'))
  // @HttpCode(200)
  // async facebook(@Req() req){
  //   console.log('redirect to facebook sign-in')
  // }

  // @Get('/facebook/redirect')
  // @UseGuards(AuthGuard('facebook'))
  // async facebookRedirect(@Req() req) {
  //   return req.user;
  // }

  // @Get('google-token')
  // @UseGuards(AuthGuard('google-token'))
  // @ApiParam({
  //   name: 'access_token',
  //   required: true,
  // })
  // async googleToken(@Req() req) {
  //   return this.authentication.social(req.user);
  // }

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async google(@Req() req) {
  //   console.log('google signin');
  // }

  // @Get('google/redirect')
  // @UseGuards(AuthGuard('google'))
  // googleRedirect(@Req() req) {
  //   return req.user;
  // }
}
