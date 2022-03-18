import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async registration(dto: UserDto): Promise<{ token: string }> {
    const username = dto.username;
    const candidate = await this.userModel.findOne({ username });

    if (candidate) {
      throw new ConflictException(
        'Пользователь с таким логином уже существует',
      );
    }

    const user = await this.userModel.create({ ...dto });

    const payload = {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async login(dto: UserDto): Promise<{ token: string }> {
    const { username, password } = dto;
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new BadRequestException(`Пользователь ${username} не найден`);
    }
    const validPassword = password === user.password;

    if (!validPassword) {
      throw new BadRequestException(`Введен неверный пароль`);
    }
    const payload = {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
