import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({ example: 'A high-end gaming laptop', description: 'Detailed description of the product' })
  @IsString()
  @MaxLength(500)
  @Transform(({ value }) => value.trim())
  description: string;

  @ApiProperty({ example: 1500.99, description: 'The price of the product' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'Electronics', description: 'Category the product belongs to' })
  @IsString()
  @MaxLength(50)
  @Transform(({ value }) => value.trim())
  category: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL of the product image' })
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => value.trim())
  image: string;
}
