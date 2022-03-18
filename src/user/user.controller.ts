import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/registration')
  registration(@Body() dto: UserDto) {
    return this.userService.registration(dto);
  }

  @Post('/login')
  login(@Body() dto: UserDto) {
    return this.userService.login(dto);
  }
}
