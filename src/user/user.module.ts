import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt.strategy';
import { FavouritesController } from './favourites/favourites.controller';
import { FavouritesService } from './favourites/favourites.service';
import { Product, ProductSchema } from '../product/product.schema';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController, FavouritesController, CartController],
  providers: [AuthService, JwtStrategy, FavouritesService, CartService],
})
export class UserModule {}
