import { IsOptional, IsString, IsNumber, IsBoolean } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class GetFilesQuery {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  programmingLanguage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  page?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
