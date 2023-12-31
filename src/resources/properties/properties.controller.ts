import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Headers,
  Put,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/config/auth/auth.guard';
import { ReturnPropertyDto } from './dto/return-property.dto';
import {
  ApiOkPaginatedResponse,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';
import { Property } from './entities/property.entity';

@Controller('properties')
@ApiTags('Properties')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}
  @ApiOkResponse({
    type: ReturnPropertyDto,
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
  create(
    @Body() createPropertyDto: CreatePropertyDto,
    @Headers('user') request: any,
  ) {
    return this.propertiesService.create({
      ...createPropertyDto,
      userId: request.sub.id,
    });
  }

  @ApiOkPaginatedResponse(ReturnPropertyDto, PropertiesService.paginateConfig)
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
  ): Promise<Paginated<Property>> {
    query.filter = query.filter || {};
    query.filter.user_id = request.sub.id;

    return this.propertiesService.findAll(query);
  }

  @ApiOkResponse({
    type: ReturnPropertyDto,
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
    description: 'Property not found',
    schema: {
      example: {
        message: 'Property not found',
        statuCode: 404,
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string, @Headers('user') request: any) {
    return this.propertiesService.findOne(id, request.sub.id);
  }

  @ApiOkResponse({
    type: ReturnPropertyDto,
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
    description: 'Property not found',
    schema: {
      example: {
        message: 'Property not found',
        statuCode: 404,
      },
    },
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @Headers('user') request: any,
  ) {
    return this.propertiesService.update(id, request.sub.id, updatePropertyDto);
  }

  @ApiOkResponse({
    type: ReturnPropertyDto,
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
    description: 'Property not found',
    schema: {
      example: {
        message: 'Property not found',
        statuCode: 404,
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Headers('user') request: any) {
    return this.propertiesService.remove(id, request.sub.id);
  }
}
