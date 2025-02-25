import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty({ example: 'john_doe', description: 'The unique username of the user' })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The unique email address of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'StrongP@ssw0rd!', description: 'The password for the user account' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

