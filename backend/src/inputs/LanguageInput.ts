import {
    Length,
  } from "class-validator";
  import { Field, InputType } from "type-graphql";
  
  @InputType()
  export class LanguageInput {
    @Field()
    @Length(1, 255)
    name: string;
  }
  