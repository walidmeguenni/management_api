import { Module } from "@nestjs/common";
import { PrismaService } from "../../framework/prisma/prisma.service";
import { PrismaModule } from "../../framework/prisma/prisma.module";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [PrismaModule ],
  providers: [PrismaService, AuthService],
  controllers: [AuthController],
})
export class PublicModule {}
