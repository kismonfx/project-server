import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { ObjectId } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.productService.getOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() file, @Body() dto: ProductDto) {
    const image = file;
    return this.productService.create(dto, image);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @UploadedFile() file,
    @Param('id') id: ObjectId,
    @Body() dto: ProductDto,
  ) {
    const image = file;
    return this.productService.update(id, dto, image);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.productService.delete(id);
  }
}
