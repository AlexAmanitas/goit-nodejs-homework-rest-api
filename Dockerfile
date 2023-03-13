FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DB_HOST=mongodb+srv://usver123:YkOOj4W9nxVx9w2ADvZA@cluster0.llpuulr.mongodb.net/contacts_db?retryWrites=true&w=majority
ENV SECRET_KEY=iKs$FT53Kt8S34TNZswP1
ENV EMAIL=derbersy@ukr.net
ENV PASSWORD=ZyOb3Cl9XD0bC5P9

EXPOSE 3000

CMD [ "npm", "start" ]

