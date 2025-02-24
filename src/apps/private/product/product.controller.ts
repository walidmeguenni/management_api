import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { imageUploadOptions } from "../../../framework/utils";

@ApiTags("Product")
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: "product not found",
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: "Internal server error",
})
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("image", imageUploadOptions))
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The record has been successfully created.",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request",
  })
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      createProductDto.image = `/uploads/${file.filename}`;
    }
    return await this.productService.create(createProductDto);
  }
  
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The records have been successfully fetched.",
  })
  async findAll() {
    return await this.productService.findAll();
  }
  
  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The record has been successfully fetched.",
  })
  @ApiParam({
    name: "id",
    description: "the identifier of the product",
    example: 1,
  })
  async findOne(@Param("id") id: string) {
    return await this.productService.findOne(+id);
  }

  @Patch(":id")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { 
          type: 'string',
          example: 'MacBook Pro',
          description: 'Product name'
        },
        description: { 
          type: 'string',
          example: 'High-performance laptop with Retina display',
          description: 'Detailed product description'
        },
        price: { 
          type: 'number',
          example: 1999.99,
          description: 'Product price in dollars'
        },
        category: { 
          type: 'string',
          example: 'Electronics',
          description: 'Product category'
        },
        image: { 
          type: 'string', 
          format: 'binary',
          description: 'Product image file'
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("image", imageUploadOptions))
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The record has been successfully updated.",
  })
  @ApiParam({
    name: "id",
    description: "the identifier of the product",
    example: 1,
  })
  async update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      updateProductDto.image = `/uploads/${file.filename}`;
    }
    return await this.productService.update(+id, updateProductDto);
  }
  
  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The record has been successfully deleted.",
  })
  @ApiParam({
    name: "id",
    description: "the identifier of the product",
    example: 1,
  })
  async remove(@Param("id") id: string) {
    return await this.productService.remove(+id);
  }
}
