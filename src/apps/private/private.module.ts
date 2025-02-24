import { Module } from "@nestjs/common";
import { PrismaService } from "../../framework/prisma/prisma.service";
import { PrismaModule } from "../../framework/prisma/prisma.module";
import { UsersService } from "./users/users.service";
import { ProductService } from "./product/product.service";
import { UsersController } from "./users/users.controller";
import { ProductController } from "./product/product.controller";


@Module({
  imports: [PrismaModule],
  providers: [PrismaService, UsersService, ProductService],
  controllers: [ UsersController, ProductController],
})
export class PrivateModule {}
