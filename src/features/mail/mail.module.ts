import { Module } from '@nestjs/common';
import { SendgridEmailService } from './sendgrid-email.service';
import { NodemailerService } from './nodemailer.service';

@Module({
	providers: [SendgridEmailService, NodemailerService],
	exports: [SendgridEmailService, NodemailerService],
})
export class MailModule {}
