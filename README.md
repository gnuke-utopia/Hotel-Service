# Hotel-Service
Hotel service system - software development methodologies project

```bash
git clone https://github.com/gnuke-utopia/Hotel-Service.git
cd Hotel-Service
git pull origin main
git status
```

== Node.js commands
```bash
npm run backend
#OR
node backend/server.js
# Access location: https://localhost:3000
```
== Docker commands

```bash
#Build and start
docker-compose up -d --build
```

```bash
docker-compose ps
docker-compose logs
docker-compose logs backend

#docker-compose logs frontend
#docker-compose logs database
```

```bash
#stop all services
docker-compose down

#stop and remove volumes (clean slate)
docker-compose down -v

#Restart all services
docker-compose restart

#Restart backend
docker-compose restart backend
```



