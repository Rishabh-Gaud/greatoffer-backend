import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://thegreatoffer:omqk7uFocpZQkhst@cluster0.6vhl28n.mongodb.net/`), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
