import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/render';
import * as nodemailer from 'nodemailer';

interface SendMailConfiguration {
  email: string;
  subject: string;
  text?: string;
  template: any;
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport(
      {
        host: this.config.get<string>('MAIL_HOST'),
        port: this.config.get<number>('MAIL_PORT'),
        secure: this.config.get<boolean>('MAIL_SECURE'),
        auth: {
          user: this.config.get<string>('MAIL_AUTH_USER'),
          pass: this.config.get<string>('MAIL_AUTH_PASS'),
        },
      },
      {
        from: {
          name: 'WishList',
          address: 'WishList',
        },
      },
    );
  }

  private generateEmail = (template) => {
    return render(template);
  };

  async sendMail({ email, subject, template }: SendMailConfiguration) {
    const html = await this.generateEmail(template);

    await this.transporter.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
