// auth/providers/auth0.provider.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import * as qs from "qs";
import { IIdentityProvider } from "../identity-provider.interface";
import { RegisterUserDto } from "src/dto/register-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";

@Injectable()
export class Auth0Provider implements IIdentityProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async getToken(): Promise<string> {
    const url = this.configService.get<string>("TOKEN_AUTH0_URL");
    const data = {
      grant_type: this.configService.get<string>("AUTH0_GRANT_TYPE"),
      client_id: this.configService.get<string>("AUTH0_CLIENT_ID"),
      client_secret: this.configService.get<string>("AUTH0_CLIENT_SECRET"),
      audience: this.configService.get<string>("AUTH0_HOST") + "/",
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

    const url = `${this.configService.get<string>("AUTH0_HOST")}/users/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await firstValueFrom(
      this.httpService.get(url, { headers })
    );
    return response.data;
  }

  async getUserProfileImage(id: string): Promise<any> {
    const token = await this.getToken();

    const url = `${this.configService.get<string>("AUTH0_HOST")}/users/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await firstValueFrom(
      this.httpService.get(url, { headers })
    );
    return response.data.picture;
  }

  async UpdateUserDetails(id: string, details: UpdateUserDto): Promise<any> {
    const token = await this.getToken();
    const url = `${this.configService.get<string>("AUTH0_HOST")}/users/${id}`;
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
    userInfo.client_id = this.configService.get<string>(
      "AUTH0_SIGNUP_CLIENT_ID"
    );
    userInfo.connection = this.configService.get<string>(
      "AUTH0_SIGNUP_CONNECTION"
    );
    const url = this.configService.get<string>("AUTH0_SIGNUP_URL");
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
