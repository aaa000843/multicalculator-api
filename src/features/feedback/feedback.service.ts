import { Injectable } from '@nestjs/common';
import { NodemailerService } from '../mail/nodemailer.service';
import { FeedbackDto } from './dto/feedback.dto';

@Injectable()
export class FeedbackService {
	constructor(private readonly nodemailerService: NodemailerService) {}

	async submitFeedback(feedback: FeedbackDto): Promise<void> {
		const emailBody = `
      <h2>Feedback Received</h2>
      <p><strong>From:</strong> ${feedback.name} (${feedback.email})</p>
      <p><strong>Message:</strong></p>
      <p>${feedback.message}</p>
    `;

		try {
			await this.nodemailerService.sendEmail({
				to: feedback.email,
				subject: 'Feedback Received',
				html: emailBody,
			});
		} catch (error) {
			console.error('Failed to send feedback email:', error);
			throw error;
		}
	}
}
