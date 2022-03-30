import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { OrderDto } from './order.dto';
import { ObjectId } from 'mongoose';

@Controller('/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Request() req) {
    return this.orderService.getAll(req.user);
  }

  @Get(':id')
  getByUser(@Param('id') id: ObjectId) {
    return this.orderService.getByUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  create(@Request() req, @Body() dto: OrderDto) {
    return this.orderService.create(req.user.id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.orderService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() dto: OrderDto) {
    return this.orderService.update(id, dto);
  }
}
