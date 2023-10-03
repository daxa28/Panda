FROM node:18.16.1 AS builder
WORKDIR /app
COPY . .
RUN npm install && yarn run build

FROM node:18.16.1
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3006
CMD ["yarn", "run", "start:dev"]