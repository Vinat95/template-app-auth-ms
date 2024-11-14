import { Inject, Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { IIdentityProvider } from "./auth/identity-provider.interface";

@Injectable()
export class AppService {
  constructor(
    @Inject("IDENTITY_PROVIDER")
    private readonly identityProvider: IIdentityProvider
  ) {}

  async getUserDetails(id: string) {
    return this.identityProvider.getUserDetails(id);
  }

  async getUserProfileImage(id: string): Promise<any> {
    return this.identityProvider.getUserProfileImage(id);
  }

  async UpdateUserDetails(id: string, details: UpdateUserDto) {
    return this.identityProvider.UpdateUserDetails(id, details);
  }

  async registerUser(userInfo: RegisterUserDto) {
    return this.identityProvider.registerUser(userInfo);
  }
}
