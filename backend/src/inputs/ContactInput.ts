import { Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class ContactInput {
  @Field()
  name!: string;

  @Field()
  title!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(1, 800)
  content!: string;
}
