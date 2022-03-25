import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('/cart')
export class CartController {
  constructor(private cartService: CartService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/add')
  addProduct(@Request() req, @Body() { productId }) {
    return this.cartService.addProduct(req.user.id, productId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/delete')
  deleteProduct(@Request() req, @Body() { productId }) {
    return this.cartService.deleteProduct(req.user.id, productId);
  }
}
