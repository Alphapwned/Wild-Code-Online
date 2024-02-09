import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

interface ILanguage {
  name: string;
}

@InputType()
export class FileInput {
	@Field()
	@Length(1, 255)
	filename: string;

	@Field({ nullable: true })
	content: string;

	@Field()
	isPublic: boolean;

	@Field({ nullable: true })
	nbOfReport: number;

	@Field({ nullable: true })
	nbOfDownload: number;
}
