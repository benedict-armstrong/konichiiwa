ng build --configuration="production"
docker buildx build --push --platform linux/amd64 . -t benarmstrong/konichiiwa-client:latest
ssh ben-docker-1 "cd konichiiwa;cd production; docker-compose pull; docker-compose up -d"