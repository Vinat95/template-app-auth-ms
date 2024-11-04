import { HttpService } from "@nestjs/axios";
import {
  Injectable,
} from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import * as qs from "qs";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

  private async getToken(): Promise<string> {
    const url = this.configService.get<string>("TOKEN_URL");
    const data = {
      grant_type: this.configService.get<string>("GRANT_TYPE"),
      client_id: this.configService.get<string>("CLIENT_ID"),
      client_secret:
      this.configService.get<string>("CLIENT_SECRET"),
      audience: this.configService.get<string>("HOST") + '/',
    };

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const response = await firstValueFrom(
      this.httpService.post(url, qs.stringify(data), { headers })
    );

    return response.data.access_token;
  }

  async getUserDetails(id: string): Promise<any> {
    const token = await this.getToken();

    const url = `${this.configService.get<string>("HOST")}/users/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await firstValueFrom(
      this.httpService.get(url, { headers })
    );
    return response.data;
  }

  async UpdateUserDetails(id: string, details: UpdateUserDto): Promise<any> {
    const token = await this.getToken();
    const url = `${this.configService.get<string>("HOST")}/users/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await firstValueFrom(
      this.httpService.patch(url, details, { headers })
    );
    return response.data;
  }

  async registerUser(userInfo: RegisterUserDto): Promise<any> {
    userInfo.client_id = this.configService.get<string>("SIGNUP_CLIENT_ID");
    userInfo.connection = this.configService.get<string>("SIGNUP_CONNECTION");
    const url = this.configService.get<string>("SIGNUP_URL");
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await firstValueFrom(
      this.httpService.post(url, userInfo, {
        headers,
      })
    );
    return response.data;
  }
}
