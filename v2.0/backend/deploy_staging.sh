docker buildx build --push --platform linux/amd64 . -t benarmstrong/konichiiwa-node-api:staging
ssh ben-docker-1 "cd konichiiwa;cd staging; docker-compose pull; docker-compose up -d"