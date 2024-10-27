import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignupSchema } from "./schema/user";
import { consumeMessages } from "./kafka/consumer";

const app: Express = express();

app.use(express.json()); // middleware module used to parse incoming request bodies in a middleware before your handlers.
app.use("/", rootRouter);

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

consumeMessages("user-topic").catch(console.error);

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});
