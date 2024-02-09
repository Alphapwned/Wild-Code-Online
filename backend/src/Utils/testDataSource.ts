import { DataSource } from "typeorm";
import { join } from "path";

export const testDataSource =
  new DataSource({
    type: "sqlite",
    database: "./sqlite-test",

    entities: [join(__dirname, "../models/**.ts")],

    synchronize: true,
    dropSchema: true,
  });
