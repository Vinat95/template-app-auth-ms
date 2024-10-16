import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ResponseInterceptor } from "response/response.interceptor";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtAuthGuard } from "./auth.guard";

@Controller()
@UseInterceptors(ResponseInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("api/:id/details")
  @UseGuards(JwtAuthGuard)
  async getUserDetails(@Param("id") id: string) {
    const userDetails = await this.appService.getUserDetails(id);
    return userDetails;
  }

  @Post("/register")
  async registerUser(@Body() user: RegisterUserDto) {
    return await this.appService.registerUser(user);
  }

  @Patch("api/:id")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async UpdateUserDetails(
    @Param("id") id: string,
    @Body() details: UpdateUserDto
  ) {
    const userDetails = await this.appService.UpdateUserDetails(id, details);
    return userDetails;
  }
}
