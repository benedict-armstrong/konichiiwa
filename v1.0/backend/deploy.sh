yarn build
docker buildx build --platform linux/amd64 --push . -t benarmstrong/konichiiwa-node-api:staging
ssh ben-docker-1 "cd konichiiwa/staging;docker-compose pull;docker-compose up -d"