import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEmail } from "class-validator";

export class UserMetadata {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  profile_image: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: "The email of the user",
    example: "user@example.com",
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty()
  @IsOptional()
  user_metadata: UserMetadata;
}
