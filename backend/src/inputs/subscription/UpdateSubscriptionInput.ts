import { Length } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class UpdateSubscriptionInput {
  @Field()
  @Length(1, 80)
  type: string
}
