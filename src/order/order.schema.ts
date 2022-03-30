import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { ProductSchema } from '../product/product.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ default: 'В обработке' })
  status: string;

  @Prop()
  total: number;

  @Prop({ default: Date.now })
  create: Date;

  @Prop(
    raw([
      {
        product: { type: ProductSchema },
        quantity: { type: Number },
        _id: false,
      },
    ]),
  )
  cart: Record<string, any>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
