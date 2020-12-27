import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { IBaseService } from '../shared/interfaces/base-service.interfaces';
import { AccountCreateDto } from './dto/account-create.dto';
import { AccountUpdateDto } from './dto/account-update.dto';

@Injectable()
export class AccountService implements IBaseService<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async create(dto: AccountCreateDto): Promise<Account> {
    const model = await this.accountRepository.create(dto);
    model.created_by = dto.created_by;  
    return await this.accountRepository.save(model);
  }

  async delete(id: number): Promise<Account> {
    const account = await this.findById(id);
    if (!account) throw new BadRequestException('account id incorrect.');
    account.active = false;
    return await this.accountRepository.save(account);
  }

  async update(dto: AccountUpdateDto): Promise<Account> {
    const account = await this.findById(dto.account_owner_id);
    if (!account) throw new BadRequestException('account id incorrect.');
    account.account_owner_name = dto.account_owner_name;
    account.account_owner_tel = dto.account_owner_tel;
    return await this.accountRepository.save(account);
  }

  async findByEmail(email: string): Promise<Account> {
    return this.accountRepository.findOne({
      where: { account_owner_email: email }
    });
  }

  async findById(id: number): Promise<Account> {
    return this.accountRepository.findOne({
      where: { account_owner_id: id }
    });
  }

  // async updateLanguage(dto: AccountLanguageUpdateDto) {
  //   const account = await this.findById(dto.account_owner_id);
  //   if (!account) throw new BadRequestException('account id incorrect.');
  //   account.language_name = dto.language_name;
  //   account.language_native_name = dto.language_native_name;
  //   account.language_initial1 = dto.language_initial1;
  //   account.language_initial2 = dto.language_initial2;
  //   return await this.accountRepository.save(account);
  // }
}