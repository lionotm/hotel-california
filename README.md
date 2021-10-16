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

