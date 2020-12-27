import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { IBaseController } from '../shared/interfaces/base-controller.interfaces';
import { IResponseFailed, IResponseSuccess } from '../shared/interfaces/response.interfaces';
import { AccountUpdateDto } from './dto/account-update.dto';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { AccountCreateDto } from './dto/account-create.dto';

@ApiTags('Account')
@Controller('account')
export class AccountController implements IBaseController<IResponseSuccess | IResponseFailed> {

  constructor(private accountService: AccountService) {
  }

  @Post('signup')
  @ApiBody({ type: AccountCreateDto })
  @HttpCode(201)
  async create(@Body() dto: AccountCreateDto): Promise<IResponseSuccess | IResponseFailed> {
    // throw new Error('Method not implemented.');
    const user = await this.accountService.create(dto);
    const resuls: IResponseSuccess = {
      success: true,
      message: 'created account successfully.',
      data: {
        account: user,
      },
    };
    return resuls;
  }

  @Get('check-email/:email')
  @HttpCode(200)
  async findByEmail(@Param('email') email: string): Promise<IResponseSuccess | IResponseFailed> {
    const data = await this.accountService.findByEmail(email);
    if (data) {
      const resuls: IResponseSuccess = {
        success: true,
        message: 'find email successfully.',
        data: {},
      };
      return resuls;
    } else {
      const resuls: IResponseFailed = {
        success: false,
        message: 'email not found.',
        error_code: 204,
        data: {},
      };
      return resuls;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @HttpCode(200)
  async findOne(@Req() req: any): Promise<IResponseSuccess | IResponseFailed> {
    const user: Account = req.user;
    const resuls: IResponseSuccess = {
      success: true,
      message: 'find account successfully.',
      data: {
        account: user,
      },
    };
    return resuls;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  @HttpCode(200)
  async update(@Req() req: any, @Body() dto: AccountUpdateDto): Promise<IResponseSuccess | IResponseFailed> {
    const user: Account = req.user;
    dto.account_owner_id = user.account_owner_id;
    const data = await this.accountService.update(dto);
    const resuls: IResponseSuccess = {
      success: true,
      message: 'update successfully.',
      data: {
        account: data,
      },
    };
    return resuls;
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiBearerAuth()
  @HttpCode(200)
  async delete(@Req() req: any): Promise<IResponseSuccess | IResponseFailed> {
    const user: Account = req.user;
    const data = await this.accountService.delete(user.account_owner_id);
    const resuls: IResponseSuccess = {
      success: true,
      message: 'delete successfully.',
      data: {
        account: data,
      },
    };
    return resuls;
  }
}
