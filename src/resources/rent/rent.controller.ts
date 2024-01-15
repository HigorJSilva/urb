import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReturnRentDto } from './dto/return-rent.dto';
import { AuthGuard } from 'src/shared/config/auth/auth.guard';

@Controller('rent')
@ApiTags('Rents')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @ApiOkResponse({
    type: ReturnRentDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Error',
    schema: {
      example: {
        message: 'Unauthorized',
        statuCode: 401,
      },
    },
  })
  @Post()
  create(@Body() createRentDto: CreateRentDto, @Headers('user') request: any) {
    return this.rentService.create({
      ...createRentDto,
      userId: request.sub.id,
    });
  }

  @Get()
  findAll() {
    return this.rentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentDto: UpdateRentDto) {
    return this.rentService.update(+id, updateRentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentService.remove(+id);
  }
}
