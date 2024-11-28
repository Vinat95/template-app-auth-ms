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
import { RegisterUserDto, UserLogin } from "./dto/register-user.dto";
import { JwtAuthGuard } from "./auth.guard";

@Controller("users")
@UseInterceptors(ResponseInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":id/detail")
  @UseGuards(JwtAuthGuard)
  async getUserDetails(@Param("id") id: string) {
    const userDetails = await this.appService.getUserDetails(id);
    return userDetails;
  }

  @Get(":id/profile-image")
  @UseGuards(JwtAuthGuard)
  async getUserProfileImage(@Param("id") id: string) {
    const userProfileImage = await this.appService.getUserProfileImage(id);
    return userProfileImage;
  }

  @Post("/login")
  async login(@Body() user: UserLogin) {
    return await this.appService.loginUser(user);
  }

  @Post("/signup")
  async registerUser(@Body() user: RegisterUserDto) {
    return await this.appService.registerUser(user);
  }

  @Patch(":id")
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
