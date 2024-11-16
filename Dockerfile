FROM node

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 4000

CMD ["node", "dist/main"]