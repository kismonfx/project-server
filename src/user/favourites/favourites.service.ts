import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.schema';
import { Model, ObjectId } from 'mongoose';
import { Product, ProductDocument } from '../../product/product.schema';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getFavourites(userId: ObjectId): Promise<Product[]> {
    const user = await this.userModel
      .findOne({ _id: userId })
      .populate('favourites');
    return user.favourites;
  }

  async addFavourite(userId: ObjectId, productId: ObjectId): Promise<Product> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { favourites: productId } },
      { new: true },
    );
    const product = this.productModel.findOne({ _id: productId });
    return product;
  }

  async deleteFavourite(
    userId: ObjectId,
    productId: ObjectId,
  ): Promise<{ productId: ObjectId }> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { favourites: productId } },
      { new: true },
    );
    return { productId };
  }
}
