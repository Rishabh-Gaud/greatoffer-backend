// user.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    try {
      return this.userService.findAll();
    } catch (error) {
      console.log('Error', error);
      return error;
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      return error;
    }
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(
        createUserDto.email,
        createUserDto.password,
      );
      return { message: 'User created successfully', user };
    } catch (error) {
      throw new Error(`Failed to create a new account`);
      return error;
    }
  }

  @Post('verify-email')
  async verifyEmail(@Body() { email, verificationCode }: VerifyEmailDto) {
    try {
      const user = await this.userService.verifyEmail(email, verificationCode);
      return { message: 'Email verified successfully', user };
    } catch (error) {
      return error;
    }
  }
}
