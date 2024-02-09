import {
    Length,
  } from "class-validator";
import { Field, InputType } from "type-graphql";
  
  @InputType()
  export class UpdateCommentsInput {
    @Field()
    @Length(1, 100000)
    comment!: string;
  }
  