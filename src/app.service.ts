import { Injectable } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';

@Controller()
@Injectable()
export class AppService {
  @Get('browse/:id')
  getHello(@Param('id') id: string): string {
    return `Hello World! You are browsing ${id}`;
  }
}
