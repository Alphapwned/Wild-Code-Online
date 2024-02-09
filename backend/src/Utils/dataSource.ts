import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { join } from "path";

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",

  synchronize: true,

  entities: [join(__dirname, "../models/**.ts")]
}

const dataSource = new DataSource(options);

export default dataSource;


