import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 10, ttl: 60 } })
  @Post('add-user')
  async register(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);
    const { ...result } = createdUser;
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 10, ttl: 60 } })
  @Get('get-user/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
