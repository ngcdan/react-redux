
FROM node:14.17

LABEL author="nqcdan"

ENV NODE_ENV="development"
ENV PORT=3000

WORKDIR /var/www
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
EXPOSE $PORT

ENTRYPOINT ["npm", "start"]