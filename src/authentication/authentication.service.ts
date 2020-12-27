import { HttpService, Injectable } from '@nestjs/common';
import { IToken, IUser } from './authentication.interfaces';
import {
  IResponseFailed,
  IResponseSuccess,
} from '../shared/interfaces/response.interfaces';
import { SignInDto } from './dto/sign-in.dto';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { Account } from '../account/account.entity';
import { AccountCreateDto } from '../account/dto/account-create.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpService,
    private readonly accountService: AccountService,
    private jwtService: JwtService,
  ) {
  }

  async jwtGenerated(account: Account): Promise<IResponseSuccess> {
    const payload = {
      name: account.account_owner_name,
      id: account.account_owner_id,
    };
    const token: IToken = {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY }),
      token_type: 'Bearer',
      expires_in: '7d'
    };
    const user = {
      account_owner_id: account.account_owner_id,
      account_owner_name: account.account_owner_name,
      account_owner_email: account.account_owner_email,
    }
    const response: IResponseSuccess = {
      success: true,
      message: 'you can access api.',
      data: {
        user: user,
        token: token,
      },
    };
    return response;
  }

  async signin(dto: SignInDto): Promise<IResponseSuccess | IResponseFailed> {
    const account = await this.accountService.findByEmail(dto.username);
    console.log(account, 'acc')
    if (account) {
      return this.jwtGenerated(account);
    } else {
      // is register user
    }
    // sign in
  }

  // async signup(dto: SignInDto): Promise<IResponseSuccess | IResponseFailed | any> {
  //   const account = await this.accountService.create(dto);
  //   return this.jwtGenerated(account);
  // }

  // async signSocial(user: any): Promise<IResponseSuccess | IResponseFailed | any> {
    // return this.jwtGenerated(account);
  // }

  // async social(user: IUser): Promise<IResponseSuccess> {
  //   const account = await this.accountService.findByEmail(user.email);
  //   if (account) {
  //     return await this.jwtGenerated(account);
  //   } else {
  //     const dto = await this.userToAccountDto(user);
  //     const account = await this.accountService.create(dto);
  //     return await this.jwtGenerated(account);
  //   }
  // }

  userToAccountDto(user: IUser): AccountCreateDto {
    const dto = new AccountCreateDto();
    if(user.middle_name == undefined){
      dto.account_owner_name = `${user.given_name} ${user.family_name}`;
    }else{
      dto.account_owner_name = `${user.given_name} ${user.middle_name} ${user.family_name}`;
    }
    dto.account_owner_email = user.email;
    // dto.account_owner_password: string;
    // dto.account_owner_tel;
    dto.created_by = dto.account_owner_name;
    dto.account_gender = user.gender;
    return dto;
  }
}