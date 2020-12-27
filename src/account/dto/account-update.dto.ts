import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountUpdateDto {

  account_owner_id?: number;

  @IsString()
  @ApiProperty({ type: String, required: true})
  account_owner_name: string;

  @IsString()
  @ApiProperty({ type: String, required: false})
  account_owner_tel: string;

  @IsNumber()
  @ApiProperty({ type: Number, required: true})
  account_social_contact_id: number;

  @IsString()
  @ApiProperty({ type: String, required: false})
  account_social_contact_your_id: string;
}