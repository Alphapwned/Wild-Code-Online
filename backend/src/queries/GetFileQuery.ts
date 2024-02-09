import { IsOptional, IsString } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class GetFilesQuery {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  orderedBy?: string

}
