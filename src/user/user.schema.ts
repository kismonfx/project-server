import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from '../product/product.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  favourites: Product[];

  @Prop(
    raw([
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        _id: false,
      },
    ]),
  )
  cart: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
