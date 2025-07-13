import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MailService } from 'src/mail/mail.service';
import Email from '../mail/templates';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Get()
    env() {
      return process.env.MAIL_AUTH_USER
    }

  @Post('generated-otp-email')
  async sendMail(
    @Body() sendMailDto: { email: string; subject: string },
  ): Promise<string> {
    await this.mailService.sendMail({
      ...sendMailDto,
      template: Email({ url: 'http://example.com' }),
    });

    return 'Email sent successfully';
  }
}
