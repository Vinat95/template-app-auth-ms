import { RegisterUserDto } from "src/dto/register-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";

export interface IIdentityProvider {
  getToken(): Promise<string>;
  getUserDetails(id: string): Promise<any>;
  getUserProfileImage(id: string): Promise<any>;
  UpdateUserDetails(id: string, details: UpdateUserDto): Promise<any>;
  registerUser(userInfo: RegisterUserDto): Promise<any>;
}
