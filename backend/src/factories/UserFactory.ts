import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { UsersModels } from "../models/UsersModels";
import { SubscriptionModels } from "../models/SubscriptionModels";
import * as argon2 from "argon2";
import { calculateEndedAt } from "../services/SubcriptionEndedAt.service";

export const UserFactory = setSeederFactory(UsersModels, async (faker: Faker) => {
  const user = new UsersModels();
  user.email = faker.internet.email();
  const password = "aA@aaaaa"
  user.password = await argon2.hash(password);
  user.username = faker.internet.userName();
  user.firstname = faker.person.firstName();
  user.lastname = faker.person.lastName();

  const subscription = await createSubscription();
  user.subscription = subscription;

  return user;
});

async function createSubscription(): Promise<SubscriptionModels> {
  const subscription = new SubscriptionModels();
  subscription.status = getRandomStatus();
  
  if (subscription.status === "Inactive") {
    subscription.type = "Free";
  } else if (subscription.status === "Active") {
    subscription.type = "Expert";
    subscription.duration = "Monthly";
    subscription.subscribedAt = new Date();
    subscription.subscriptionEndedAt = calculateEndedAt(subscription.duration, subscription.status, subscription.subscribedAt,);
    
  }
  
  return subscription.save();
}

function getRandomStatus(): string {
  const randomValue = Math.random();
  return randomValue < 0.5 ? "Inactive" : "Active";
}
