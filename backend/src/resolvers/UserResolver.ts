import { Arg, Mutation, Ctx } from "type-graphql";
import { UsersModels } from "../models/UsersModels";
import { updateUserInput } from "../inputs/updateUserInput";
import argon2 from "argon2";

export class User {
  @Mutation(() => UsersModels)
  async updateUser(
    @Ctx() context: any,
    @Arg("update")
    { lastname, firstname, email, password, username }: updateUserInput
  ): Promise<UsersModels> {
    const userToUpdate = await UsersModels.findOneBy({
      id: context.user.id,
    });
    if (userToUpdate === null) {
      throw new Error("User not found");
    }
    if (userToUpdate.id !== context.user.id) {
      throw new Error("You don't have the rights to modify this user");
    }
    if (password) {
      userToUpdate.password = await argon2.hash(password);
    }
    const userUpdate = await UsersModels.merge(userToUpdate, {
      lastname,
      firstname,
      email,
      username,
    }).save();

    return userUpdate;
  }
}
