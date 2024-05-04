FROM node:18

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8000

VOLUME [ "/app/node_modules" ]

CMD npm run dev