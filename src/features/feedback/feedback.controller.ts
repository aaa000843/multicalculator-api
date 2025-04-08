import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { FeedbackDto } from './dto/feedback.dto';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
	constructor(private readonly feedbackService: FeedbackService) {}

	@Post()
	@ApiOperation({ summary: 'Submit feedback' })
	@ApiResponse({
		status: 201,
		description: 'Feedback submitted successfully',
	})
	@ApiResponse({
		status: 400,
		description: 'Invalid feedback data',
	})
	@ApiResponse({
		status: 500,
		description: 'Internal server error',
	})
	async submitFeedback(@Body() feedback: FeedbackDto): Promise<void> {
		await this.feedbackService.submitFeedback(feedback);
	}
}
