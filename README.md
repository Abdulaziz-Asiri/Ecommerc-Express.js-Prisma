
# E-commerce back-end project with Express.js


This e-commerce back-end project built using <strong>Express.js</strong>, the project leverages the efficiency and flexibility of <strong>Prisma ORM</strong> for database management with <strong>PostgreSQL</strong> and employs <strong>Kafka</strong> as a messaging broker for real-time data streaming and microservices communication.

## Key Features
<ul>
<li>User Management: Secure registration, authentication, and user profile management.</li>
<li>Product Management: CRUD operations for product listings, detailed categorization, and inventory control.</li>
<li>Order Management: Smooth order handling, including order creation, updates, and status tracking, along with full support for transactions and rollback in case of errors.</li>
<li>Shopping Cart: Cart operations that support item addition, removal, and cart retrieval for user convenience.</li>
<li>Payment Integration: Placeholder for secure payment processing integration.
Full-Text Search: Efficient product search functionality with support for advanced filtering and sorting.</li>
</ul>

## 💻 Tech Stack:
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) 
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) 
<ul>
<li><b>Express.js</b>: Provides the framework for developing a scalable REST API.</li>
<li><b>Prisma ORM</b>: Prisma ORM Simplifies database interactions with PostgreSQL, allowing schema definition through TypeScript for clear and maintainable code.</li>
<li><b>PostgreSQL</b>: Used as the primary relational database, optimized for data integrity, complex queries, and transaction handling.</li>
<li><b>Kafka</b>: Facilitates real-time communication for high-demand features like order tracking, notifications, and microservices support.</li>
<li></li>
</ul>


### Kafka Usage
Kafka enables asynchronous, real-time communication across services. Events such as "Order Created," "Order Status," or "User logging " are published to Kafka topics, ensuring immediate updates across all services without impacting performance. This design allows seamless scaling of features such as notifications, analytics, and integration with other microservices.

For more details follow this repo: https://github.com/TomDoesTech/event-driven-microservices


## Run Locally

Clone the project

```bash
  git clone https://github.com/Abdulaziz-Asiri/Ecommerc-Express.js-Prisma.git
```

Go to the project directory

```bash
  cd Ecommerc-Express.js-Prisma
```

Install dependencies

```bash
  npm install
```
Go to the conduktor directory

```bash
  cd conduktor
```
Run docker container


```bash
  chmod +x launch.sh utils-local.sh
```
- Make sure you can execute the launch.sh and utils-local.sh scripts chmod +x launch.sh utils-local.sh

Start the Conduktor app ./launch.sh
```bash
./launch.sh
```

- When prompted, enter your organization, email & password

Start the server

```bash
  npm run start
```

## Testing the API with Postman
To test the API endpoints with Postman, follow these steps:
  1. Install Postman
If you haven't already, download and install Postman.

2. You can import an API collection in Postman to have all endpoints pre-configured:

-  Import Postman collection in the repository "E-commerce.postman_collection", go to File > Import in Postman and upload the JSON file.
- The collection will appear in the left panel, where you can see all available endpoints.