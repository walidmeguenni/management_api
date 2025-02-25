import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123456', description: 'The password of the user' })
  @IsString()
  @MinLength(8)
  password: string;
}
