import { IsEmail, Length, MaxLength, MinLength, Matches  } from 'class-validator';
import { Field, InputType } from "type-graphql";
import { IsUnique } from './IsUniqueValidator';

@InputType()
export class SignUpInput {
  @Field({ nullable: true })
  @MaxLength(100)
  firstname: string

  @Field({ nullable: true })
  @MaxLength(100)
  lastname: string

  @Field()
  @Length(1, 80)
  @IsUnique("username", {
    message:
      "Le noms d'utilisateur choisi éxiste déjà. Merci d'en choisir un autre"
  })
  username!: string

  @Field()
  @IsEmail()
  @IsUnique("email", {
    message: "L'email choisi éxiste déjà. Merci d'en choisir un autre"
  })
  email!: string

  @Field()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
  @MinLength(8)
  password!: string

  @Field()
  @MaxLength(100)
  type: string
}
