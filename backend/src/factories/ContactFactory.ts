import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { ContactModels } from "../models/ContactModels";
import { UsersModels } from "../models/UsersModels";

export const ContactFactory = setSeederFactory(
  ContactModels,
  async (faker: Faker) => {
    const contact = new ContactModels();
    contact.title = faker.lorem.lines();
    contact.content = faker.lorem.lines();
    contact.user = { id: faker.number.int({ min: 1, max: 10 }) } as UsersModels;
    contact.name = faker.person.firstName();
    contact.email = faker.internet.email();
    return contact;
  }
);
