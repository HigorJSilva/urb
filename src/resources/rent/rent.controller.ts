import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
  UseGuards,
  Put,
} from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
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
  @ApiNotFoundResponse({
    description: 'Rent not found',
    schema: {
      example: {
        message: 'Rent not found',
        statuCode: 404,
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string, @Headers('user') request: any) {
    return this.rentService.findOne(id, request.sub.id);
  }

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
  @ApiNotFoundResponse({
    description: 'Rent not found',
    schema: {
      example: {
        message: 'Rent not found',
        statuCode: 404,
      },
    },
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Headers('user') request: any,
    @Body() updateRentDto: UpdateRentDto,
  ): Promise<ReturnRentDto> {
    return this.rentService.update(id, request.sub.id, updateRentDto);
  }

  @ApiOkResponse({})
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Error',
    schema: {
      example: {
        message: 'Unauthorized',
        statuCode: 401,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Rent not found',
    schema: {
      example: {
        message: 'Rent not found',
        statuCode: 404,
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Headers('user') request: any) {
    return this.rentService.remove(id, request.sub.id);
  }
}
