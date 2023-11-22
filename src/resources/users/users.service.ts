import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Bcrypt from 'src/shared/providers/hash/bcrypt';
import { IHashProvider } from 'src/shared/interfaces/hash.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(Bcrypt)
    private readonly hash: IHashProvider,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hash.generateHash(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  validate(validateUserDto: ValidateUserDto) {
    return `This action returns all users`;
  }
}
