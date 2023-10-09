import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';

@UsePipes(new ValidationPipe())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post()
  validate(@Body() validateUserDto: ValidateUserDto) {
    return this.usersService.validate(validateUserDto);
  }
}
