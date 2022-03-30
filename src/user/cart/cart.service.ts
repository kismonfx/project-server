import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.schema';
import { Model, ObjectId } from 'mongoose';
import { Product, ProductDocument } from '../../product/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getCart(userId: ObjectId) {
    const user = await this.userModel
      .findOne({ _id: userId })
      .populate('cart.product');
    return user.cart;
  }

  async addProduct(userId: ObjectId, productId: ObjectId) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { cart: { product: productId } } },
      { new: true },
    );

    const product = await this.productModel.findOne({ _id: productId });
    const cartItem = {
      product,
      quantity: 1,
    };

    return cartItem;
  }

  async deleteProduct(userId: ObjectId, productId: ObjectId) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { product: productId } } },
      { new: true },
    );
    return { productId };
  }

  async clearCart(userId: ObjectId) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { cart: [] } },
      { new: true },
    );
  }
}
