import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async getAll(user) {
    let orders;
    if (user.isAdmin) {
      orders = await this.orderModel.find();
    } else {
      orders = await this.orderModel.find({ user: user.id });
    }
    return orders;
  }

  async getByUser(id) {
    const orders = await this.orderModel.find({ user: id });
    return orders;
  }

  async create(userId, dto) {
    const order = await this.orderModel.create({
      ...dto,
      user: userId,
    });
    return order;
  }

  async delete(orderId) {
    await this.orderModel.findOneAndDelete({ _id: orderId });
    return { orderId };
  }

  async update(orderId, dto) {
    const updatedOrder = await this.orderModel.findOneAndUpdate(
      { _id: orderId },
      { ...dto },
      { new: true },
    );

    return updatedOrder;
  }
}
