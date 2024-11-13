import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignupSchema } from "./schema/user";
import { consumeMessages } from "./kafka/consumer";
import { createClient, ClickHouseClient } from "@clickhouse/client";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

const app: Express = express();


export const client: ClickHouseClient = createClient({
  url: "https://nb6ly4174o.eu-central-1.aws.clickhouse.cloud:8443",
  // host: "http://localhost:8123",
  username: "default",
  password: ".PUI68gjWPidP",
});



app.use(express.json());
app.use("/api", rootRouter);

export const prismaCilent = new PrismaClient({
  log: ["query"],
}).$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineOne: true,
          linetwo: true,
          city: true,
          conutry: true,
          pincode: true,
        },
        compute: (addr) => {
          return `${addr.lineOne}, ${addr.linetwo}, ${addr.city}, ${addr.conutry}-${addr.pincode}`;
        },
      },
    },
  },
});

// consumeMessages("user-topic").catch(console.error);
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID,
    first_name String,
    last_name String,
    job String
  ) ENGINE = MergeTree()
  ORDER BY id;
`;

async function initDatabase() {
  try {
    await client.exec({ query: createTableQuery });
    console.log("Table 'users' created or already exists.");
  } catch (error) {
    console.error("Error", error);
  }
}
// Generate 100 fake users
app.post("/generate-users", async (req: Request, res: Response) => {
  try {
    
    const users = Array.from({ length: 1000 }, () => ({
      id: uuidv4(),
      first_name: faker.person.firstName(),
      last_name: faker.color.human(),
      job: faker.person.jobTitle(),
    }));

    // Create the insert query with all users
    const values = users
      .map(
        (user) =>
          `('${user.id}', '${user.first_name}', '${user.last_name}', '${user.job}')`
      )
      .join(",\n");

    const insertUsersQuery = `
      INSERT INTO users (id, first_name, last_name, job) VALUES 
      ${values};
    `;

    await client.exec({ query: insertUsersQuery });

    res.status(201).json({
      message: "100 users created successfully",
      users: users, 
    });
  } catch (error) {
    console.error("Error inserting users:", error);
    res.status(500).json({ message: "Error creating users" });
  }
});
// Create user 
app.post("/users", async (req: Request, res: Response) => {
  const { first_name, last_name, job } = req.body;
  console.log(first_name);

  const insertUserQuery = `
    INSERT INTO users (id, first_name, last_name, job) VALUES 
    ('${uuidv4()}', '${first_name}', '${last_name}', '${job}');
  `;


  try {
    await client.exec({ query: insertUserQuery });
    res.status(201).json({ message: "Users created successfully" });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});
// Get users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const resultSet = await client.query({
      query: "SELECT * FROM users ",
      format: "JSONEachRow",
    });
    const users = await resultSet.json();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.get("/count-users", async (req:Request, res:Response) => {
  try{
    const resultSet = await client.query({
      query: " SELECT count(*) FROM users",
      format: "JSONEachRow"
,    })
    const users = await resultSet.json();
    res.json(users)
  }catch(error){
    console.error("Error counting users:", error)
    res.status(500).json({message: "Error fetching users"});
  }
})

app.use(errorMiddleware);
  app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
  });





