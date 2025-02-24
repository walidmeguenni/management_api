import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: "user not found",
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: "Internal server error",
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The records have been successfully fetched.",
  })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The record has been successfully fetched.",
  })
  @ApiParam({
    name: "id",
    description: "the identifier of the user",
    example: 1,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The record has been successfully updated.",
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "the user with this email or username already exists",
  })
  @ApiParam({
    name: "id",
    description: "the identifier of the user",
    example: 1,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
