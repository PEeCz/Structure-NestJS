import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountCreateDto {
  @IsString()
  @ApiProperty({ type: String, required: true})
  account_owner_name: string;

  @IsString()
  @ApiProperty({ type: String, required: true})
  account_owner_email: string;

  @IsString()
  @ApiProperty({ type: String, required: false})
  account_owner_password: string;

  @IsString()
  @ApiProperty({ type: String, required: false})
  account_owner_tel: string;

  @IsString()
  @ApiProperty({ type: String, required: false})
  account_gender: string;

  @IsString()
  @ApiProperty({ type: String, required: false})
  created_by: string;
}