// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'deep-email-validator';
import * as bcrypt from 'bcryptjs';
import * as randomstring from 'randomstring';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // const { first_name, email, password } = createUserDto;
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async createUser(email: string, password: string): Promise<User> {
    try {
      const emailValidation = await validate('rishabh.kumbh@gmail.com');
      console.log(emailValidation);

      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = randomstring.generate(6);
      const user = new this.userModel({
        email,
        password: hashedPassword,
        verificationCode,
        first_name: 'dummy',
      });
      console.log('user >>>>>>>>>>>>>> ', user);
      await user.save();
      // await this.emailService.sendEmail(
      //   email,
      //   'Verify Your Email',
      //   `Your OTP: ${verificationCode}`,
      // );
      return user;
    } catch (error) {
      console.log('error from user service >>>>>>>', error);
      throw error;
    }
  }
  async verifyEmail(email: string, verificationCode: string): Promise<User> {
    const user = await this.userModel.findOne({ email, verificationCode });
    if (!user) {
      throw new Error('Invalid verification code.');
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
