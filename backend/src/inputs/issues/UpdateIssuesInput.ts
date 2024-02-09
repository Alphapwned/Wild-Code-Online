import {
    Length,
    IsEnum,
    IsOptional
  } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IssuesType } from "../../enums/IssuesType";

  @InputType()
  export class UpdateIssuesInput {

    @Field({ nullable: true })
    @Length(1, 100000)
    @IsOptional()
    issue?: string;
  
    @Field(() => IssuesType, { nullable: true }) // Faire de même pour 
    @IsOptional()
    @IsEnum(IssuesType)
    status?: IssuesType;
  }
  