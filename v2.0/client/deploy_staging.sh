ng build --configuration="staging"
docker buildx build --push --platform linux/amd64 . -t benarmstrong/konichiiwa-client:staging
ssh ben-docker-1 "cd konichiiwa;cd staging; docker-compose pull; docker-compose up -d"