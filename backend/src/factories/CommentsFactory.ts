import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { CommentsModels } from "../models/CommentsModels";
import { UsersModels } from "../models/UsersModels";
import { FilesModels } from "../models/FilesModels";

export const CommentsFactory = setSeederFactory(CommentsModels, async (faker: Faker) => {
  const comment = new CommentsModels();
  comment.comment = faker.lorem.lines();
  comment.user = { id: faker.number.int({ min: 1, max: 10 }) } as UsersModels;
  comment.file = { id: faker.number.int({ min: 1, max: 10 }) } as FilesModels;
  return comment
});