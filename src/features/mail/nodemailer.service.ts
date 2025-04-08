import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

export interface EmailOptions {
	to: string;
	subject: string;
	html: string;
	from?: {
		email: string;
		name: string;
	};
}

@Injectable()
export class NodemailerService {
	private transporter: nodemailer.Transporter;

	constructor(private readonly config: ConfigService) {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: this.config.get('SMTP_USER'),
				pass: this.config.get('SMTP_PASSWORD'),
			},
		});
	}

	async sendEmail(options: EmailOptions): Promise<void> {
		const defaultFrom = {
			email: this.config.get('SMTP_USER', 'noreply@example.com'),
			name: this.config.get('SMTP_FROM_NAME', 'MultiCalculator'),
		};

		const mailOptions = {
			from: `${options.from?.name || defaultFrom.name} <${options.from?.email || defaultFrom.email}>`,
			to: options.to,
			subject: options.subject,
			html: options.html,
		};

		try {
			await this.transporter.sendMail(mailOptions);
		} catch (error) {
			console.error('Failed to send email:', error);
			throw error;
		}
	}
}
