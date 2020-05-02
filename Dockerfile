FROM node:10

USER root
RUN apt update && apt install -y dnsutils

USER node
WORKDIR /home/node/build

COPY --chown=node:node [".", "."]
RUN cd frontend/ \
 && npm i \
 && npm run build \
 && cp -r dist/* ../backend/public \
 && cd ~/build/backend \
 && npm i \
 && cp -r . /home/node/app

USER root
RUN cd /home/node/app \
 && rm -rf /home/node/build
USER node

WORKDIR /home/node/app

ENV NODE_ENV=production

CMD ["node", "index.js"]