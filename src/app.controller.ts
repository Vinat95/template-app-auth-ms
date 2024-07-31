import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseInterceptor } from 'response/response.interceptor';

@Controller()
@UseInterceptors(ResponseInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id/role')
  async getUserRole(@Param('id') id: string) {
    const userRole = await this.appService.getUserRole(id);
    return userRole;
  }
}
