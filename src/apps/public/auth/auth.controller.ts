import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Auth')
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: "Bad request",
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: "Internal server error",
})
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The record has been successfully created.",
  })
  register(@Body() data: RegisterAuthDto) {
    return this.authService.register(data);
  }

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The record has been successfully fetched.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "auth not found",
  })
  login(@Body() data: LoginAuthDto) {
    return this.authService.login(data);
  }
}
