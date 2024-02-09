import {
    Length,
    IsEnum,
  } from "class-validator";
import { Field, InputType } from "type-graphql";
import { InteractionType } from "../../enums/InteractionType";

  @InputType()
  export class InteractionsInput {
    @Field(() => InteractionType)
    @IsEnum(InteractionType)
    type!: InteractionType;

    @Field()
    fileId!: number;
  }
  