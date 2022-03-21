import {
  Request,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/favourites')
export class FavouritesController {
  constructor(private favouritesService: FavouritesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getFavourites(@Request() req) {
    return this.favouritesService.getFavourites(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/add')
  addFavourite(@Request() req, @Body() { productId }) {
    return this.favouritesService.addFavourite(req.user.id, productId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/delete')
  deleteFavourite(@Request() req, @Body() { productId }) {
    return this.favouritesService.deleteFavourite(req.user.id, productId);
  }
}
