import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly configService: ConfigService)
    {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      //host: 'Gmail',
      //port: 587,
      secure: false, // true для SSL, false для обычного SMTP
      auth: {
        user: this.configService.get<string>("EMAIL_SMTP"), // Ваше имя пользователя
        pass: this.configService.get<string>("PASS_SMTP"), // Ваш пароль
      },
    });
  }

  async sendOnEmail(email: string, subject:string, text:string) {
    const mailOptions = {
      from: this.configService.get<string>("EMAIL_SMTP"), // Адрес отправителя
      to: email, // Адрес получателя
      subject: subject,
      text: text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email отправлен на ${email}`);
      return true;
    } catch (error) {
      console.error(`Ошибка отправки email: ${error}`);
      return false;
    }
  }
}