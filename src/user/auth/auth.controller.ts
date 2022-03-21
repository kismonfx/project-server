import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Post('/registration')
  registration(@Body() dto: UserDto) {
    return this.userService.registration(dto);
  }

  @Post('/login')
  login(@Body() dto: UserDto) {
    return this.userService.login(dto);
  }
}
