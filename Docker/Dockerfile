# builder image
FROM node:14.15.0 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
#COPY package-lock.json ./
#COPY yarn.lock ./

# Install app dependencies
RUN yarn install

COPY . .

RUN yarn run nest build
RUN ls

FROM node:14.15.0-alpine

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python \
    bash
    
# Change TimeZone  
RUN apk add --update tzdata
ENV TZ=Asia/Bangkok
ENV NODE_ENV=development
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=5432
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=123456
ENV DATABASE_SCHEMA=structuredb_nest
ENV DATABASE_SYNCHRONIZE=true
ENV JWT_SECRET_KEY=YWRtaW4gcGFuZWwgbG9naWNzcGFyaw==
ENV PORT=8080
ENV HOST=0.0.0.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/ /usr/src/app/dist

CMD ["node", "/usr/src/app/dist/main.js"]