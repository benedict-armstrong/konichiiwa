docker rm --force konichiiwa-client
docker build . -t benarmstrong/konichiiwa-client:staging
docker run -d -p 80:80 --name konichiiwa-client benarmstrong/konichiiwa-client:staging 