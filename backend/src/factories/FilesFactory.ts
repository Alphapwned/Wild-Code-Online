import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { FilesModels } from "../models/FilesModels";
import { LanguageModels } from "../models/LanguageModels";
import { UsersModels } from "../models/UsersModels";

export const FilesFactory = setSeederFactory(FilesModels, async (faker: Faker) => {
  const file= new FilesModels();
  file.filename = faker.system.fileName();
  file.content = faker.lorem.lines();
  file.user = { id: faker.number.int({ min: 1, max: 10 })} as UsersModels;
  file.language = { id: faker.number.int({ min: 1, max: 1 })} as LanguageModels;
  file.isPublic = faker.datatype.boolean();

  return file
});