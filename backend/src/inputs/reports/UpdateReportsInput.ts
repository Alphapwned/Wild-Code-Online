import {
    Length,
    IsOptional,
  } from "class-validator";
import { Field, InputType } from "type-graphql";

  @InputType()
  export class UpdateReportsInput {
    
    @Field({ nullable: true })
    @Length(1)
    comment?: string;
  }
  