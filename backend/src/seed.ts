import { DataSource, DataSourceOptions } from "typeorm";
import {
  Seeder,
  SeederOptions,
  SeederFactoryManager,
  runSeeders,
} from "typeorm-extension";
import { UsersModels } from "./models/UsersModels";
import { join } from "path";
import { LanguageModels } from "./models/LanguageModels";
import { CommentsModels } from "./models/CommentsModels";
import { ContactModels } from "./models/ContactModels";
import { FilesModels } from "./models/FilesModels";
import { InteractionsModels } from "./models/InteractionsModels";
import { ReportsModels } from "./models/ReportsModels";
import { IssuesModels } from "./models/IssuesModels";
import { UserFactory } from "./factories/UserFactory";
import { LanguageFactory } from "./factories/LanguageFactory";
import { CommentsFactory } from "./factories/CommentsFactory";
import { ContactFactory } from "./factories/ContactFactory";
import { FilesFactory } from "./factories/FilesFactory";
import { InteractionsFactory } from "./factories/InteractionsFactory";
import { ReportsFactory } from "./factories/ReportsFactory";
import { IssuesFactory } from "./factories/IssuesFactory";
// import { SubscriptionModels } from "./models/SubscriptionModels";
// import { SubscriptionFactory } from "./factories/SubscriptionFactory";

export default class MySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = factoryManager.get(UsersModels);
    await userFactory.saveMany(10);

    const languageFactory = factoryManager.get(LanguageModels);
    await languageFactory.saveMany(1);

    const filesFactory = factoryManager.get(FilesModels);
    await filesFactory.saveMany(10);

    const commentsFactory = factoryManager.get(CommentsModels);
    await commentsFactory.saveMany(10);

    const interactionsFactory = factoryManager.get(InteractionsModels);
    await interactionsFactory.saveMany(10);

    const reportsFactory = factoryManager.get(ReportsModels);
    await reportsFactory.saveMany(10);

    const issuesFactory = factoryManager.get(IssuesModels);
    await issuesFactory.saveMany(10);

    const contactFactory = factoryManager.get(ContactModels);
    await contactFactory.saveMany(10);
  }
}

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",

  synchronize: true,

  entities: [join(__dirname, "./models/**.ts")],

  factories: [
    UserFactory,
    LanguageFactory,
    CommentsFactory,
    FilesFactory,
    InteractionsFactory,
    ReportsFactory,
    IssuesFactory,
    ContactFactory,
  ],
  seeds: [MySeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
