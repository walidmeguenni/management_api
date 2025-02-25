import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
export class LoginAuthDto {
  @ApiProperty({
    example: "john.doe@example.com",
    description: "The unique email address of the user",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "password123456",
    description: "The password for the user account",
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
