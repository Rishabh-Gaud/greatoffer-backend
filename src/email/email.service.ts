import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  sendEmail(email: string, subject: string): void {
    console.log('Sending email to ', email, subject);
  }
}
