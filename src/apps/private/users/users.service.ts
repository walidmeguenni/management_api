import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService, CustomRequest, Role } from "../../../framework";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    try {
      const result = await this.prismaService.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!result) {
        return {
          status: false,
          message: "No users found",
          data: [],
        };
      }
      return {
        status: true,
        message: "Users fetched successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error in UsersService::findAll", error);
      throw error;
    }
  }

  async findOne(id: number, req: CustomRequest) {
    try {
      const { userId, role } = req;
      if (userId !== id && role !== Role.OWNER) {
        throw new ConflictException("You are not authorized to view this user");
      }
      const result = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!result) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return {
        status: true,
        message: "User fetched successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error in UsersService::findOne", error);
      throw error;
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    req: CustomRequest
  ) {
    try {
      const { username, email, password } = updateUserDto;
      const { userId, role } = req;
      
      if (userId !== id && role !== Role.OWNER) {
        throw new ConflictException("You are not authorized to update this user");
      }
      const existingUser = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!existingUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      if (username) {
        const usernameExists = await this.prismaService.user.findFirst({
          where: {
            username: username,
            id: { not: id },
          },
        });
        if (usernameExists) {
          throw new ConflictException("Username already exists");
        }
      }
      if (email) {
        const emailExists = await this.prismaService.user.findFirst({
          where: {
            email: email,
            id: { not: id },
          },
        });
        if (emailExists) {
          throw new ConflictException("Email already exists");
        }
      }

      if (password) {
        const salt = bcrypt.genSaltSync(10);
        updateUserDto.password = bcrypt.hashSync(password, salt);
      }

      const result = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: updateUserDto,
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return {
        status: true,
        message: "User updated successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error in UsersService::update", error);
      throw error;
    }
  }

  async remove(id: number, req: CustomRequest) {
    try {
      const { userId, role } = req;
      if (userId !== id && role !== Role.OWNER) {
        throw new ConflictException("You are not authorized to view this user");
      }
      
      const existingUser = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!existingUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      await this.prismaService.user.delete({
        where: {
          id: id,
        },
      });
      return {
        status: true,
        message: "User deleted successfully",
      };
    } catch (error) {
      console.error("Error in UsersService::remove", error);
      throw error;
    }
  }
}
