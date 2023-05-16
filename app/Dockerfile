FROM node:16

# Create app directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json and run npm install
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

EXPOSE 3030

CMD [ "npm", "run", "start" ]