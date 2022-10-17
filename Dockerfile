FROM node:15.3.0 AS builder

USER root
RUN apt-get update && apt-get install -y dnsutils tzdata \
 && mkdir -p /home/node/app && chown node:node -R /home/node \
 && apt-get clean

USER node
WORKDIR /home/node/app

COPY --chown=node:node ["./frontend/package.json", "./"]
COPY --chown=node:node ["./frontend/package-lock.json", "./"]

RUN npm i

COPY --chown=node:node ["./frontend/", "./"]

RUN npm run build

##############################################################

FROM node:15.3.0 AS final

USER root
RUN apt-get update && apt-get install -y dnsutils tzdata \
 && mkdir -p /home/node/app && chown node:node -R /home/node \
 && apt-get clean

USER node
WORKDIR /home/node/app

COPY --chown=node:node ["./backend/package.json", "./"]
COPY --chown=node:node ["./backend/package-lock.json", "./"]

ENV NODE_ENV=production
RUN npm i

COPY --chown=node:node ["./backend", "./"]

RUN rm -rf frontend

COPY --from=builder ["/home/node/app/dist/", "./public/"]

CMD ["node", "index.js"]
