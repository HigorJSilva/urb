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
import {
  ApiOkPaginatedResponse,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';
import { Rent } from './entities/rent.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

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

  @ApiOkPaginatedResponse(ReturnRentDto, RentService.paginateConfig)
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Error',
    schema: {
      example: {
        message: 'Unauthorized',
        statuCode: 401,
      },
    },
  })
  @Get()
  findAll(
    @Headers('user') request: any,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Rent>> {
    query.filter = query.filter || {};
    query.filter.user_id = request.sub.id;
    return this.rentService.findAll(query);
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

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  dispatchDueRent() {
    return this.rentService.dispatchDueRent();
  }
}
