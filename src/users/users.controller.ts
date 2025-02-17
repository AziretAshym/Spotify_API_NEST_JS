import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.shema';
import { UserRegisterDto } from './register-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Post()
  userRegister(@Body() userRegisterDto: UserRegisterDto) {
    const user: UserDocument = new this.userModel({
      email: userRegisterDto.email,
      password: userRegisterDto.password,
      displayName: userRegisterDto.displayName,
    });

    user.generateToken();
    return user.save();
  }

  @UseGuards(AuthGuard('local'))
  @Post('/session')
  login(@Req() req: Request & { user: UserDocument }) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard)
  @Delete('/session')
  async logout(@Req() req: Request & { user: UserDocument }) {
    const user = await this.userModel.findById(req.user._id);

    if (!user) {
      return { message: 'User not found' };
    }

    user.generateToken();
    await user.save();

    return { message: 'Logged out successfully' };
  }
}
