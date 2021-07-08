import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection } from "typeorm";
import { schema } from "./schema";
import { Users } from "./entities/Users";

const main = async () => {
  await createConnection({
    type: "mysql",
    database: "CRUDtutorial",
    username: "root",
    logging: true,
    synchronize: true,
    entities: [Users],
    host: "db",
  });

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
  app.listen(3000, () => console.log("Running on port 3000"));
};

main().catch((err) => console.log(err));
