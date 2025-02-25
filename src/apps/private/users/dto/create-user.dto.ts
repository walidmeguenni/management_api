import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { Role } from '../../../../framework/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securepassword123', description: 'The password of the user' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: Role.USER, description: 'The role of the user', enum: Role })
  @IsEnum(Role)
  role: Role;
}
