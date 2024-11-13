// import {client} from './index'
// import { ClickHouseClient, createClient } from "@clickhouse/client";
// import { v4 as uuidv4 } from "uuid"; //
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS users (
//     id UUID,
//     first_name String,
//     last_name String,
//     job String
//   ) ENGINE = MergeTree()
//   ORDER BY id;
// `;

// async function initDatabase() {
//   try {
//     await client.exec({ query: createTableQuery });
//     console.log("Table 'users' created or already exists.");
//   } catch (error) {
//     console.error("Error", error);
//   }
// }
// app.post("/profile", async (req, res) => {
//   try {
//     const { first_name, last_name, job } = req.body;
//     console.log("reqest", first_name, last_name, job);
//     // Insert data into ClickHouse table
//     await client.query(
//       `INSERT INTO my_table
//       (first_name, last_name, job)
//       VALUES
//       (?, ?, ?)
//     `,
//       [first_name, last_name, job]
//     );

//     res.status(200).json({ message: "Data inserted successfully" });
//   } catch (error) {
//     console.error("Error inserting data:", error);
//     res.status(500).json({ error: "Error inserting data" });
//   }
// });
