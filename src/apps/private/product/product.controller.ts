import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Product")
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: "DPCA not found",
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: "Internal server error",
})
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The record has been successfully created.",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
  })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "The records have been successfully fetched.",
  })
  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "The record has been successfully fetched.",
  })
  @ApiParam({
    name: "id",
    description: "the identifier of the product",
    example: 1,
  })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.productService.findOne(+id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "The record has been successfully updated.",
  })
  @ApiParam({
    name: "id",
    description: "the identifier of the product",
    example: 1,
  })
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(+id, updateProductDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "The record has been successfully deleted.",
  })
  @ApiParam({
    name: "id",
    description: "the identifier of the product",
    example: 1,
  })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.productService.remove(+id);
  }
}
