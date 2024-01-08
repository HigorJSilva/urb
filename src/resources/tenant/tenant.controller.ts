import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
  UseGuards,
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

  @Get()
  findAll() {
    return this.tenantService.findAll();
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(+id, updateTenantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(+id);
  }
}
