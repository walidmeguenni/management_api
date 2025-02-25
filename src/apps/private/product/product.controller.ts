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
  UseGuards,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { imageUploadOptions } from "../../../framework/utils";
import { Roles } from "../../../framework/decorators/roles.decorator";
import { Role } from "../../../framework/enums/role.enum";
import { RolesGuard } from "../../public/auth/guard/auth.guard";

@ApiTags("Product")
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: "product not found",
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: "Internal server error",
})
@ApiBearerAuth()
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
  @Roles(Role.OWNER)
  @UseGuards(RolesGuard)
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
  @ApiQuery({ name: 'category', required: false, description: 'Filter by product category' })
  @ApiQuery({ name: 'sort', required: false, enum: ['asc', 'desc'], description: 'Sort by price: ascending or descending' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The records have been successfully fetched.",
  })

  async findAll(@Query('category') category?: string, @Query('sort') sort?: 'asc' | 'desc') {
    return await this.productService.findAll(category, sort);
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
  @Roles(Role.OWNER, Role.USER)
  @UseGuards(RolesGuard)
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
  @Roles(Role.OWNER)
  @UseGuards(RolesGuard)
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
  @Roles(Role.OWNER)
  @UseGuards(RolesGuard)
  async remove(@Param("id") id: string) {
    return await this.productService.remove(+id);
  }
}
