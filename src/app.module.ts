import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { mongoCreds } from './config/mongo';
import { EmailModule } from './email/email.module';
@Module({
  imports: [MongooseModule.forRoot(mongoCreds.SECRET_KEY), UserModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
