import { registerEnumType } from "type-graphql";

export enum InteractionType {
    Like = "Like",
    Dislike = "Dislike",
  }
  
  registerEnumType(InteractionType, {
    name: "InteractionType",
  });