import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../../framework/decorators/roles.decorator";
import { RolesGuard } from "../../public/auth/guard/auth.guard";
import { Role } from "../../../framework/enums/role.enum";
import { CustomRequest } from "../../../framework";

@ApiTags("Users")
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: "user not found",
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: "Internal server error",
})
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The records have been successfully fetched.",
  })
  @Roles(Role.OWNER)
  @UseGuards(RolesGuard)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The record has been successfully fetched.",
  })
  @ApiParam({
    name: "id",
    description: "the identifier of the user",
    example: 1,
  })
  @Roles(Role.OWNER, Role.USER)
  @UseGuards(RolesGuard)
  async findOne(@Param("id") id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(":id")
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
  @Roles(Role.USER, Role.OWNER)
  @UseGuards(RolesGuard)
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: CustomRequest
  ) {
    return await this.usersService.update(+id, updateUserDto, req);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The record has been successfully deleted.",
  })
  @Roles(Role.OWNER, Role.USER)
  @UseGuards(RolesGuard)
  async remove(@Param("id") id: string) {
    return await this.usersService.remove(+id);
  }
}
