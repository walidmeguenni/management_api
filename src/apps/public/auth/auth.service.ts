import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"; 
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { PrismaService } from "../../../framework";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(data: RegisterAuthDto) {
    try {
      const existingUser = await this.prismaService.user.findFirst({
        where: {
          OR: [{ username: data.username }, { email: data.email }],
        },
      });

      if (existingUser) {
        throw new BadRequestException("Username or email already exists");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(data.password, salt);

      const newUser = await this.prismaService.user.create({
        data: {
          ...data,
          password: hashedPassword,
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

      return {
        status: true,
        message: "User registered successfully",
        data: newUser,
      };
    } catch (error) {
      console.error("Error in AuthService::register", error);
      throw error;
    }
  }

  async login(data: LoginAuthDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: data.email },
      });

      const isPasswordValid = bcrypt.compareSync(data.password, (user && user.password) ?? "");

      if (!user || !isPasswordValid) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const { password, ...userWithoutPassword } = user;

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      return {
        status: true,
        message: "Login successful",
        data: {
          token,
          user: userWithoutPassword,
        },
      };
    } catch (error) {
      console.error("Error in AuthService::login", error);
      throw error;
    }
  }
}
