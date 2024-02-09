import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { ReportsModels } from "../models/ReportsModels";
import { UsersModels } from "../models/UsersModels";
import { FilesModels } from "../models/FilesModels";

export const ReportsFactory = setSeederFactory(ReportsModels, async (faker: Faker) => {
  const report = new ReportsModels();
  report.comment = faker.lorem.lines();
  report.user = { id: faker.number.int({ min: 1, max: 10 }) } as UsersModels;
  report.file = { id: faker.number.int({ min: 1, max: 10 }) } as FilesModels;
  return report
});