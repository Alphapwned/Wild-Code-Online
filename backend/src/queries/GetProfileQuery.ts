import { IsOptional, IsBoolean } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class GetProfileQuery {
  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPublic?: Boolean;
}
