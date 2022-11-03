import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hi')
  getHello(@Query('name') name: string,@Query('time') time: string): string {
    return this.appService.getHello(name,time);
  }
}
