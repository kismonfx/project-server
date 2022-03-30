import { ProductDto } from '../product/product.dto';

export interface OrderDto {
  status?: string;
  total: number;
  create?: Date;
  cart: [
    {
      product: ProductDto;
      quantity: number;
    },
  ];
}
