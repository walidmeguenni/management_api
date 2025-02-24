FROM node:20.13.0-alpine3.18 as base
WORKDIR /app

RUN apk add --no-cache 

COPY package.*json ./
RUN npm i --legacy-peer-deps

COPY . .

EXPOSE 8000

FROM base AS dev
CMD [ "npm", "run", "start" ]

