import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  username: string;

  @ApiProperty()
  @IsString()
  @Length(6, 65)
  password: string;
}
