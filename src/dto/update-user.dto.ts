import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  MinLength,
  ValidateNested,
} from "class-validator";

export class UserMetadata {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  nickname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profile_image: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: "The email of the user",
    example: "user@example.com",
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(1)
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty({
    type: UserMetadata,
  })
  @ValidateNested()
  @Type(() => UserMetadata)
  user_metadata: UserMetadata;
}
