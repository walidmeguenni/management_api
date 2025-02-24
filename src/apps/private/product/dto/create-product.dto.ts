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
  @Transform(({ value }) => {
    if (value === undefined || value === '') return undefined;
    return typeof value === 'string' ? parseFloat(value) : value;
  })
  @IsNumber({}, { message: 'Price must be a valid number' })
  price: number;


  @ApiProperty({ example: 'Electronics', description: 'Category the product belongs to' })
  @IsString()
  @MaxLength(50)
  @Transform(({ value }) => value.trim())
  category: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsString()
  image: string;
}
