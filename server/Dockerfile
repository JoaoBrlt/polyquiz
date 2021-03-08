# Build the server.
FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Setup the entrypoint.
RUN dos2unix entrypoint.sh
RUN chmod +x entrypoint.sh

# Run the server.
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
