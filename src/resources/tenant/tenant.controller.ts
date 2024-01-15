import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/config/auth/auth.guard';
import { ReturnTenantDto } from './dto/return-tunant.dto';
import {
  ApiOkPaginatedResponse,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';
import { Tenant } from './entities/tenant.entity';

@Controller('tenant')
@ApiTags('Properties')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @ApiOkResponse({
    type: ReturnTenantDto,
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
    @Body() createTenantDto: CreateTenantDto,
    @Headers('user') request: any,
  ) {
    return this.tenantService.create({
      ...createTenantDto,
      userId: request.sub.id,
    });
  }

  @ApiOkPaginatedResponse(ReturnTenantDto, TenantService.paginateConfig)
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
  ): Promise<Paginated<Tenant>> {
    query.filter = query.filter || {};
    query.filter.user_id = request.sub.id;

    return this.tenantService.findAll(query);
  }

  @ApiOkResponse({
    type: ReturnTenantDto,
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
    description: 'Tenant not found',
    schema: {
      example: {
        message: 'Tenant not found',
        statuCode: 404,
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string, @Headers('user') request: any) {
    return this.tenantService.findOne(id, request.sub.id);
  }

  @ApiOkResponse({
    type: ReturnTenantDto,
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
    description: 'Tenant not found',
    schema: {
      example: {
        message: 'Tenant not found',
        statuCode: 404,
      },
    },
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Headers('user') request: any,
    @Body() updateTenantDto: UpdateTenantDto,
  ): Promise<ReturnTenantDto> {
    return this.tenantService.update(id, request.sub.id, updateTenantDto);
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
    description: 'Tenant not found',
    schema: {
      example: {
        message: 'Tenant not found',
        statuCode: 404,
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Headers('user') request: any) {
    return this.tenantService.remove(id, request.sub.id);
  }
}
