import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException('email already in use');
    }

    const hashedPassword = await this.hash.generateHash(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }

    return user;
  }
}
