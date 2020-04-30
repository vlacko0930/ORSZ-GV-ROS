From node:10

WORKDIR E:\Asztal\ORSZÁGVÁROS\backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]