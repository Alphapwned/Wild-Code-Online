import { setSeederFactory } from "typeorm-extension";
import { InteractionsModels } from "../models/InteractionsModels";
import { InteractionType } from "../enums/InteractionType";
import { UsersModels } from "../models/UsersModels";
import { FilesModels } from "../models/FilesModels";

export const InteractionsFactory = setSeederFactory(InteractionsModels, async (faker) => {
  const interactions = new InteractionsModels();
  interactions.type = getRandomInteractionType();
  interactions.user = { id: faker.datatype.number({ min: 1, max: 10 }) } as UsersModels;
  interactions.file = { id: faker.datatype.number({ min: 1, max: 10 }) } as FilesModels;
  return interactions;
});

function getRandomInteractionType(): InteractionType {
  const randomValue = Math.random();
  return randomValue < 0.5 ? InteractionType.Like : InteractionType.Dislike;
}