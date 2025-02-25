import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "../../../framework/prisma/prisma.service";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const result = await this.prismaService.product.create({
        data: createProductDto,
      });
      if (!result) {
        throw new InternalServerErrorException("Error in creating product");
      }
      return {
        status: true,
        message: "Product created successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error in ProductService::create", error);
      throw error;
    }
  }

  async findAll(category?: string, sort?: 'asc' | 'desc') {
    try {
      const where = category ? { category } : {};
      const orderBy = sort ? { price: sort } : undefined;
      const result = await this.prismaService.product.findMany({
        where,
        orderBy,
      });
      if (!result) {
        return {
          status: false,
          message: "No products found",
          data: [],
        };
      }
      return {
        status: true,
        message: "Products fetched successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error in ProductService::findAll", error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prismaService.product.findUnique({
        where: {
          id: id,
        },
      });
      if (!result) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return {
        status: true,
        message: "Product fetched successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error in ProductService::findOne", error);
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const existingProduct = await this.prismaService.product.findUnique({
        where: {
          id: id,
        },
      });
      if (!existingProduct) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      const result = await this.prismaService.product.update({
        where: {
          id: id,
        },
        data: updateProductDto,
      });
      if (!result) {
        throw new InternalServerErrorException("Error in updating product");
      }
      return {
        status: true,
        message: "Product updated successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error in ProductService::update", error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const existingProduct = await this.prismaService.product.findUnique({
        where: {
          id: id,
        },
      });
      if (!existingProduct) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      const result = await this.prismaService.product.delete({
        where: {
          id: id,
        },
      });
      if (!result) {
        throw new InternalServerErrorException("Error in deleting product");
      }
      return {
        status: true,
        message: "Product deleted successfully",
      };
    } catch (error: any) {
      console.error("Error in ProductService::remove", error);
      throw error;
    }
  }
}
