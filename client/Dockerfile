# Build the client.
FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Run the client.
EXPOSE 4200
CMD ["npm", "start"]
