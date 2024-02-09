import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateFileInput {
	@Field({ nullable: true })
	@Length(1, 255)
	filename: string;

	@Field({ nullable: true })
	content: string;

	@Field({ nullable: true })
	isPublic: boolean;

	@Field({ nullable: true })
	nbOfReport: number;

	@Field({ nullable: true })
	nbOfDownload: number;

	@Field({ nullable: true })
	languageId: number;
}
