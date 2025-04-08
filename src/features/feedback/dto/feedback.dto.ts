import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FeedbackDto {
	@ApiProperty({
		description: 'Name of the person submitting feedback',
		example: 'John Doe',
		minLength: 3,
		maxLength: 100,
	})
	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	@MaxLength(100)
	name: string;

	@ApiProperty({
		description: 'Email address of the person submitting feedback',
		example: 'john.doe@example.com',
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'Feedback message content',
		example: 'I really enjoyed using the calculator. The interface is user-friendly and the results are accurate.',
		minLength: 10,
		maxLength: 1000,
	})
	@IsNotEmpty()
	@IsString()
	@MinLength(10)
	@MaxLength(1000)
	message: string;
}
