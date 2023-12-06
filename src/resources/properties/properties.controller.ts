import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/config/auth/auth.guard';
import { ReturnPropertyDto } from './dto/return-property.dto';

@Controller('properties')
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

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
