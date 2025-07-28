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
        // host: String(process.env.MAIL_HOST),
        // port: Number(process.env.MAIL_PORT),
        // secure: Boolean(process.env.MAIL_SECURE),
        service: "gmail",
        auth: {
          user: String(process.env.MAIL_AUTH_USER),
          pass: String(process.env.MAIL_AUTH_PASS),
        },
        // tls: {
        //   rejectUnauthorized: false
        // }
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
