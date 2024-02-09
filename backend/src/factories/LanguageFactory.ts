import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { LanguageModels } from "../models/LanguageModels";

export const LanguageFactory = setSeederFactory(LanguageModels, async (faker: Faker) => {
  const language = new LanguageModels();
  language.name = "javascript";
  language.version = "18.15.0";
  return language
});