FROM node

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

RUN npm install -g @vue/cli

RUN npm audit fix --force

RUN npm i --save

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . /app

EXPOSE 8080

CMD ["npm", "run", "serve"]