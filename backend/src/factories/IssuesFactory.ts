import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { IssuesModels } from "../models/IssuesModels";
import { UsersModels } from "../models/UsersModels";
import { FilesModels } from "../models/FilesModels";
import { IssuesType } from "../enums/IssuesType";

export const IssuesFactory = setSeederFactory(IssuesModels, async (faker: Faker) => {
  const issues = new IssuesModels();
  issues.issue = faker.lorem.lines();
  issues.status = getRandomIssuesType();
  issues.user = { id: faker.number.int({ min: 1, max: 10 }) } as UsersModels;
  issues.file = { id: faker.number.int({ min: 1, max: 10 }) } as FilesModels;
  return issues
});

function getRandomIssuesType(): IssuesType {
  const randomValue = Math.random();
  if (randomValue < 0.33) {
    return IssuesType.Open;
  } else if (randomValue < 0.66) {
    return IssuesType.Pending;
  } else {
    return IssuesType.Close;
  }
}