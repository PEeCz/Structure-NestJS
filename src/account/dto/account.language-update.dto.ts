import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountLanguageUpdateDto {

  account_owner_id?: number;

  @IsString()
  @ApiProperty({ type: String, required: true})
  language_name: string;

  @IsString()
  @ApiProperty({ type: String, required: false})
  language_native_name?: string;

  @IsString()
  @ApiProperty({ type: String, required: true})
  language_initial1: string;

  @IsString()
  @ApiProperty({ type: String, required: false})
  language_initial2?: string;
}