import { IsOptional, IsNumber } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class GetCommentsQuery {
	@Field({ nullable: true })
	@IsOptional()
	@IsNumber()
	file?: number;
}
