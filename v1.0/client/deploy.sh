docker buildx build --load --platform linux/amd64 . -t benarmstrong/konichiiwa-client:staging
docker push benarmstrong/konichiiwa-client:staging
ssh ben-docker-1 "cd konichiiwa/staging;docker pull benarmstrong/konichiiwa-client:staging;docker-compose up -d"
