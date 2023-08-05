// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: false })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false, minlength: 6 })
  pincode: number;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  verificationCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
