FROM node

WORKDIR /app

COPY . .

RUN npm install && npm run build

ENV PORT 4000

EXPOSE $PORT

CMD ["node", "dist/main"]