import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ResponseInterceptor } from "response/response.interceptor";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller()
@UseInterceptors(ResponseInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":id/details")
  async getUserDetails(@Param("id") id: string) {
    const userDetails = await this.appService.getUserDetails(id);
    return userDetails;
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async UpdateUserDetails(
    @Param("id") id: string,
    @Body() details: UpdateUserDto
  ) {
    const userDetails = await this.appService.UpdateUserDetails(id, details);
    return userDetails;
  }
}
