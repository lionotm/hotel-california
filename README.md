# 🏝 Hotel California 🏨

- Waitlist system designed to queue and dequeue customers
- Client server architecture
- Can be hosted in the cloud with containers.
- Client: React with Material UI  
- Server: Node.js with Express


## To get started

To run this locally 💻

```bash
npm install
npm run deploy
```

To run with Docker 🐳  
Please check if you have Docker installed locally

```bash
docker build . -t hotel-california
docker run -p 8000:8000 hotel-california
```

## To add

MongoDB for persistent storage
