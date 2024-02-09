import { registerEnumType } from "type-graphql";

export enum IssuesType {
  Open = "Open",
  Pending = "Pending",
  Close = "Close",
}

registerEnumType(IssuesType, {
  name: "IssuesType",
});
