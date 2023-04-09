import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {
  }

  @Post()
  createRole(@Body()dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get()
  getRoles() {
    return this.roleService.getRoles();
  }

  @Put('update-role')
  updateRole(dto: CreateRoleDto & { id: number }) {
    return this.roleService.updateRole(dto.id, dto);
  }
}