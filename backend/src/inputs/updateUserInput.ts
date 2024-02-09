import {
  IsEmail,
  Length,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
  IsStrongPassword,
  ValidateIf,
} from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsUnique } from "./IsUniqueValidator";

@InputType()
export class updateUserInput {
  @Field({ nullable: true })
  @MaxLength(100)
  firstname: string;

  @Field({ nullable: true })
  @MaxLength(100)
  lastname: string;

  @Field({ nullable: true })
  @Length(1, 80)
  @IsUnique("username", {
    message:
      "Le noms d'utilisateur choisi éxiste déjà. Merci d'en choisir un autre",
  })
  username!: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsUnique("email", {
    message: "L'email choisi éxiste déjà. Merci d'en choisir un autre",
  })
  email!: string;

  @Field({ nullable: true })
  @ValidateIf((o) => !!o.password)
  @IsStrongPassword({
    minSymbols: 1,
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
  })
  password!: string;
}
