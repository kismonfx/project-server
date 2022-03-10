import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { ProductDto } from './product.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private fileService: FileService,
  ) {}

  async getAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getOne(id: ObjectId): Promise<Product> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async create(dto: ProductDto, image: string): Promise<Product> {
    const imagePath = this.fileService.createFile(image);
    const product = await this.productModel.create({
      ...dto,
      image: imagePath,
    });
    return product;
  }

  async update(id: ObjectId, dto: ProductDto, image): Promise<Product> {

    const product = await this.productModel.findById(id);
    let imagePath = product.image;

    if (image) {
      this.fileService.removeFile(product.image);
      imagePath = this.fileService.createFile(image);
    }

    const updatedProduct = await this.productModel.findOneAndUpdate(
      { _id: id },
      { ...dto, image: imagePath },
      { new: true },
    );

    return updatedProduct;
  }

  async delete(id: ObjectId): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    this.fileService.removeFile(deletedProduct.image);
    return deletedProduct;
  }
}
