import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './test.dto';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {
  }

  @Post()
  async create(@Body()dto: CreateTestDto) {
    return this.testService.create(dto);
  }

  @Get()
  async getAll(){
    return this.testService.getTests()
  }
}