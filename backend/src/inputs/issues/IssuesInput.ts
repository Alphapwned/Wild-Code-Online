import {
    Length,
    IsEnum
  } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IssuesType } from "../../enums/IssuesType";
  


  @InputType()
  export class IssuesInput {

    @Field()
    @Length(1, 100000)
    issue!: string;

    @Field(() => IssuesType)
    @IsEnum(IssuesType)
    status!: IssuesType;

    @Field()
    fileId!: number;
  }
  