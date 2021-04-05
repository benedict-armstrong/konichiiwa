FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# ENV STRIPE_KEY "sk_test_51HWoe8AHin6MlcyGnRdMo2Xyq1TGmFSNVI9yyEbx9QwXhoPvnQLsrV1dBvodj7kCkPFCX0rYZenwy3R2AuAwtVTB00wpFojJ2G"

EXPOSE 5000

CMD [ "node", "build/app.js" ]