# 🏝 Hotel California 🏨

- Waitlist system designed to queue and dequeue customers
- Client server architecture
- Can be hosted in the cloud with containers.
- Client: React with Material UI
- Server: Node.js with Express
- Database: Mongo Atlas
- API: RESTful & GraphQL

## To get started

To run this locally 💻

```bash
npm install
npm run deploy
```

Note: Make sure you have a `.env` file in `./server` if you would like to define your own port

To run with Docker 🐳  
Please check if you have Docker installed locally

```bash
docker build . -t hotel-california
docker run -p 5000:5000 hotel-california # map port 5000 in container to port 5000 on Docker host
```

Note: please check [Dockerfile](./Dockerfile) for the exposed port and map it accordingly. For instance, if `EXPOSE 5000` then `docker run -p 5000:5000 hotel-california`

## Requirements

- The intention is to host the waitlist database in the MongoDB server. Write a standalone script to test this logic using the MongoDB CLI. Your script must initialize the database and, further, test all CRUD operations. (Similar to scripts/trymongo.js in Example-06-03) [6 points]
  - cd into `./server` and run `node scripts/trymongo.js`
  - implemented just to test database, actual app uses another collection
- Implement an API for the user to interact with the back end. Code the API using GraphQL (refer “The Create API” in Chapter 5) of textbook. This includes defining the graphql schema and the corresponding typeDefs and resolvers. Note that you now must implement APIs for performing the three operations (add, read, delete). [4 points]
  - relevant files located in `./server/src/graphql`
  - left RESTful implemention intact
- Integrate the APIs created in the previous point with the front-end by changing the front-end (UI) code (i.e., App.jsx). (refer “The Create API” in Chapter 5). Note that you must integrate all three APIs mentioned before. [2 points]
  - relevant files located in `./client/src/hooks`
- Finally, Integrate the MongoDB back-end with the GraphQL resolvers. Note that multiple GraphQL resolver functions will want to access MongoDB. For example, you will have a minimum of three such functions, one corresponding to each of add, read, delete APIs. Do not forget to initialize the database schema before running your code. (refer Chapter6 – “Schema Initialization”, “Reading from MongoDB”, and “Writing to MongoDB”) [8 points]
  - relevant files located in `./server/src/graphql`, `./server/src/services`
- Bonus: Separate the UI and API code into two different folders (and) run the UI and API at different ports. (Chapter 7 of textbook) [Bonus: 2 points]
  - done with `./client` and `./server`
