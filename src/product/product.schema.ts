import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  genre: string;

  @Prop()
  developer: string;

  @Prop()
  platform: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  release: Date;

  @Prop()
  price: number;

  @Prop()
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
