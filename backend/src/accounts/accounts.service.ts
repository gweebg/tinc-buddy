import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './accounts.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async deposit(userId: number, ammount: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    user.balance += ammount;
    return this.usersRepository.save(user);
  }

  async withdraw(userId: number, ammount: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    user.balance -= ammount;
    return this.usersRepository.save(user);
  }
}