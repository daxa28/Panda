# Start from a base nodejs image.
FROM node:18.17.1

# Set the working directory inside the container.
WORKDIR /app

# Expose the port that the application listens on.
EXPOSE 3006

# Install/check modules and run application.
# You can redefine this command (in docker-compose file, for example) to do something else.
CMD npm install && npm run start:dev

# FROM node:18.17.1 AS builder
# WORKDIR /app
# COPY . .
# RUN npm install && yarn run build

# FROM node:18.16.1
# WORKDIR /app
# COPY --from=builder /app ./
# EXPOSE 3006
# CMD ["yarn", "run", "start:dev"]