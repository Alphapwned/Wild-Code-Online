import { Arg, Mutation, Ctx, Authorized } from "type-graphql";
import { ContactModels } from "../models/ContactModels";
import { ContactInput } from "../inputs/ContactInput";
import { UsersModels } from "../models/UsersModels";

export class ContactResolver {
  @Mutation(() => ContactModels)
  async IContact(
    @Arg("input")
    { name, title, email, content }: ContactInput,
    @Ctx() context: any
  ): Promise<ContactModels> {
    let user = null;

    if (context.user && context) {
      user = await UsersModels.findOneBy({
        id: context.user.id,
      });
    }

    const createdForm = await ContactModels.create({
      name,
      user,
      title,
      email,
      content,
    }).save();

    return createdForm;
  }
}
